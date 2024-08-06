import { Navigate } from 'react-router-dom';
import Dash from '../pages/Dash';
import User from '../pages/User';

const routesConfig = [
  {
    path: "/", 
    element: <Navigate to="/dashboard" replace /> 
  },
  {
    path: 'dashboard',
    element: <Dash />
  },
  {
    path: 'users/*',  
    children: [
      { path: 'list', element: <User /> },
      { path: 'profile', element: <User /> }
    ]
  }
];

export default routesConfig;
