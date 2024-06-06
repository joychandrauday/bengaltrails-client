import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import Provider from "./Provider/Provider";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <RouterProvider router={router} />
          <ToastContainer></ToastContainer>
        </Provider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
