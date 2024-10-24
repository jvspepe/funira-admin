import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/space-grotesk";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import AccountCreate from "./pages/account-create.tsx";
import AccountLogin from "./pages/account-login.tsx";
import Products from "./pages/products.tsx";
import Categories from "./pages/categories.tsx";

import Dashboard from "./pages/dashboard.tsx";
import Home from "./pages/home.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";

/* 
  Images must be 4:3 ratio!
*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/account-create",
    element: <AccountCreate />,
  },
  {
    path: "/account-login",
    element: <AccountLogin />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard",
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                path: "produtos",
                element: <Products />,
              },
              {
                path: "categorias",
                element: <Categories />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      {/* <App /> */}
    </AuthProvider>
  </React.StrictMode>,
);
