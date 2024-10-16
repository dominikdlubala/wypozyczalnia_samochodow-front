import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 

import Root from './pages/Root'; 
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage'; 
import CarsPage from './pages/CarsPage'; 
import CarPage from './pages/CarPage'; 
import ReservationsPage from './pages/ReservationsPage';
import ProtectedRoute from './components/login/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, 
    children: [
      {
        index: true, 
        element: <HomePage />
      }, 
      {
        path: '/login', 
        element: <LoginPage />
      }, 
      {
        path: '/register', 
        element: <RegisterPage />
      }, 
      {
        path: '/cars', 
        element: <CarsPage/>
      }, 
      {
        path: '/car',
        element: <CarPage/>
      }, 
      {
        path: '/reservations', 
        element: (
          <ProtectedRoute>
            <ReservationsPage />
          </ProtectedRoute>
        )
      }
    ]
  }
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}