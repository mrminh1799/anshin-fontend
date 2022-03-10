import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import AuthLayout from './layouts/AuthLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';

import HomePage from './pages/website/HomePage'
import OrderManger from './pages/admin/OrderManager';
import ProductDetail from './pages/website/ProductDetail';
import CartDetail from './pages/website/CartDetail';



// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'order', element: <OrderManger/>}
      ]
    },
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        { path: '/', element: <HomePage/>},
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: 'ProductDetail/:id', element: <ProductDetail />},
        { path: '/cart', element: <CartDetail/>},
       
      ]
    },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
