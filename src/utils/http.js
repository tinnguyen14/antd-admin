import axios, {HttpStatusCode} from 'axios'
import { authPath } from '../constants/auth.path'
import { clearLS, getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS, setProfileToLS, setRefreshTokenToLS } from './auth'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './httpStatusCode'

class Http {
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: 'http://localhost:3000/',
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      config => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = `Bearer ${this.accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      response => {
        const { url } = response.config
        if (authPath.login === url) {
          const { access_token, refresh_token, userinfo } = response.data
          this.updateTokens(access_token, refresh_token, userinfo)
        }
        return response
      },
      error => this.handleResponseError(error)
    )
  }

  updateTokens(access_token, refresh_token, userinfo) {
    this.accessToken = access_token
    this.refreshToken = refresh_token
    setAccessTokenToLS(access_token)
    setRefreshTokenToLS(refresh_token)
    setProfileToLS(userinfo)
  }

  handleResponseError(error) {
    const { status } = error.response
    if (![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(status)) {
      const message = error.response.data.message || error.message
      console.error(message) 
    }

    if (isAxiosUnauthorizedError(error)) {
      if (isAxiosExpiredTokenError(error) && error.config.url !== authPath.refresh) {
        return this.refreshTokenIfNeeded(error.config)
      }
      this.clearCredentials()
    }

    return Promise.reject(error)
  }

  refreshTokenIfNeeded(originalConfig) {
    if (!this.refreshTokenRequest) {
      this.refreshTokenRequest = this.handleRefreshToken().finally(() => {
        this.refreshTokenRequest = null;
      });
    }
    return this.refreshTokenRequest.then(access_token => {
      const newHeaders = { ...originalConfig.headers, authorization: `Bearer ${access_token}` };
      return this.instance({
        ...originalConfig,
        headers: newHeaders
      });
    }).catch(error => {
      console.error('Failed to refresh token or resend request:', error);
      throw error;
    });
  }
  

  handleRefreshToken() {
    return this.instance
      .post(authPath.refresh, { refresh_tokens: this.refreshToken })
      .then(res => {
        const { access_token } = res.data
        this.updateTokens(access_token, this.refreshToken)
        return access_token
      })
      .catch(error => {
        this.clearCredentials()
        throw error
      })
  }

  clearCredentials() {
    clearLS()
    this.accessToken = ''
    this.refreshToken = ''
    window.dispatchEvent(new CustomEvent('logout'));
  }
}

const http = new Http().instance
export default http
