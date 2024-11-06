import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/space-grotesk";
import AuthProvider from "./contexts/auth/auth-provider";
import router from "@/routes/router";
import "./index.css";

/* 
  Images must be 4:3 ratio!
*/

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
