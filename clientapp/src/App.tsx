import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CarsPage from "./pages/CarsPage";
import CarPage from "./pages/CarPage";
import ReservationsPage from "./pages/ReservationsPage";
import AdminPage from "./pages/AdminPage";
import AccountPage from "./pages/AccountPage";
import ProtectedRoute from "./components/login/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/cars",
        element: <CarsPage />,
      },
      {
        path: "/car/:id",
        element: <CarPage />,
      },
      {
        path: "/reservations",
        element: (
          <ProtectedRoute>
            <ReservationsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute requiredRole="Admin">
            <AdminPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/account",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
