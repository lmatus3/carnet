import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CarnetApp } from "./CarnetApp";
import { BrowserRouter } from "react-router";
import { envs } from "./plugins/envs";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={envs.GOOGLE_CLIENT}>
      <BrowserRouter basename={envs.NOMBRE_APP}>
        <CarnetApp />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
