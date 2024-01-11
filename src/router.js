import { createBrowserRouter } from "react-router-dom";
import { appRoutes } from "features/app/routes";
import { authRoutes } from "features/auth/routes";
import { AuthLayout } from "layouts/auth/AuthLayout";
import { MainLayout } from "layouts/main/MainLayout";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: Object.values(appRoutes),
  },
  {
    element: <AuthLayout />,
    children: Object.values(authRoutes),
  },
]);
