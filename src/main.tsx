import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CarnetApp } from "./CarnetApp";
import { BrowserRouter } from "react-router";

const baseName = import.meta.env.VITE_NOMBRE_APP;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={baseName}>
      <CarnetApp />
    </BrowserRouter>
  </StrictMode>
);
