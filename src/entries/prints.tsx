import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrintsPage } from "../pages/PrintsPage";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing root");
}

createRoot(root).render(
  <StrictMode>
    <PrintsPage />
  </StrictMode>,
);
