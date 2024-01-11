import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-auth-kit";
import { RouterProvider } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./store";
import { router } from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider store={store}>
    <AuthProvider authType={"cookie"} authName={"_auth"}>
      <RouterProvider router={router} />
    </AuthProvider>
  </StoreProvider>,
);
