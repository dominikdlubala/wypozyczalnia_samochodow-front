import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import Root from './pages/Root'; 
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/LoginPage'; 

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
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}