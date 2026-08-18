import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TimesTablesChartsPage } from "../pages/TimesTablesChartsPage";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing root");
}

createRoot(root).render(
  <StrictMode>
    <TimesTablesChartsPage />
  </StrictMode>,
);
