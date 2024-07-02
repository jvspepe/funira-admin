import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/space-grotesk";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateProduct from "./pages/CreateProduct.tsx";
import AllProducts from "./pages/AllProducts.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import CreateCategory from "./pages/CreateCategory.tsx";

/* 
  Images must be 4:3 ratio!
*/

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/produtos",
        element: <AllProducts />,
      },
      {
        path: "/adicionar-produto",
        element: <CreateProduct />,
      },
      {
        path: "/adicionar-categoria",
        element: <CreateCategory />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
