import { createBrowserRouter } from "react-router-dom";
import Protected from "@/routes/protected";
import AccountCreate from "@/pages/account-create";
import AccountLogin from "@/pages/account-login";
import Products from "@/pages/products";
import Categories from "@/pages/categories";
import Dashboard from "@/pages/dashboard";
import Home from "@/pages/home";
import MainLayout from "@/layouts/main-layout";
import AddProductForm from "@/features/products/add-product-form";
import ProductsDisplay from "@/pages/products-display";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/criar-conta",
    element: <AccountCreate />,
  },
  {
    path: "/login",
    element: <AccountLogin />,
  },
  {
    element: <Protected />,
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
                children: [
                  {
                    index: true,
                    element: <ProductsDisplay />,
                  },
                  {
                    path: "adicionar",
                    element: <AddProductForm />,
                  },
                ],
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

export default router;
