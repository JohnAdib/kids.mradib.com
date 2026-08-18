import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HubPage } from "../pages/HubPage";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing root");
}

createRoot(root).render(
  <StrictMode>
    <HubPage />
  </StrictMode>,
);
