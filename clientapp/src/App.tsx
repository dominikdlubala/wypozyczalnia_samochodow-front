import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import Root from './pages/Root'; 
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage'; 

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
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}