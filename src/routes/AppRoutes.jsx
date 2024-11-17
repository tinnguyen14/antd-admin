import { Suspense, useEffect } from 'react'
import { useRoutes, Outlet, Navigate, useNavigate } from 'react-router-dom'
import AppLayout from '../layouts/Layout'
import Dash from '../pages/Dash'
import routesConfig from './routes'
import Login from '../pages/Auth/Login/Login'

const AppRoutes = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const handleLogout = () => {
      navigate('/login');  
    };
  
    window.addEventListener('logout', handleLogout);
  
    return () => {
      window.removeEventListener('logout', handleLogout);
    };
  }, []);
  const routes = useRoutes([
    {
      element: (
        <AppLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </AppLayout>
      ),
      children: routesConfig
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '*',
      element: <Navigate to='/404' replace />
    },
    {
      path: '404',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Dash />
        </Suspense>
      )
    }
  ])

  return routes
}

export default AppRoutes
