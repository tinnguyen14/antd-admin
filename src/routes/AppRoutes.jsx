import { Suspense } from 'react';
import { useRoutes, Outlet, Navigate } from 'react-router-dom';
import AppLayout from '../layouts/Layout';
import Dash from '../pages/Dash';
import routesConfig from './routes';

const AppRoutes = () => {
  const routes = useRoutes([
    {
      element: (
        <AppLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </AppLayout>
      ),
      children: routesConfig,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: '404',
      element: <Suspense fallback={<div>Loading...</div>}><Dash /></Suspense>,
    },
  ]);

  return routes;
};

export default AppRoutes;
