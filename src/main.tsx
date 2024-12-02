import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CarnetApp } from "./CarnetApp";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CarnetApp />
    </BrowserRouter>
  </StrictMode>
);
