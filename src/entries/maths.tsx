import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MathsPage } from "../pages/MathsPage";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing root");
}

createRoot(root).render(
  <StrictMode>
    <MathsPage />
  </StrictMode>,
);
