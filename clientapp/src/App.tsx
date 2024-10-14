import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import Root from './pages/Root'; 
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage'; 
import CarsPage from './pages/CarsPage'; 

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
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}