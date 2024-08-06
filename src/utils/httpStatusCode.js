// constants/httpStatusCode.enum.js
export const HttpStatusCode = {
  Unauthorized: 401,
  UnprocessableEntity: 422
}

export function isAxiosExpiredTokenError(error) {
  return error.response && error.response.data && error.response.data.code === 'TOKEN_EXPIRED'
}

export function isAxiosUnauthorizedError(error) {
  return error.response && error.response.status === HttpStatusCode.Unauthorized
}
