import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TimesTablesPage } from "../pages/TimesTablesPage";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing root");
}

createRoot(root).render(
  <StrictMode>
    <TimesTablesPage />
  </StrictMode>,
);
