import { useEffect, useState } from "react";
import { listPrintedRecords } from "../printHistory/listPrintedRecords";
import { browserStore } from "../storage/browserStore";
import { PrintHistoryList } from "./PrintHistoryList";

export function PrintsTools() {
  const store = browserStore();
  const [history, setHistory] = useState(() => listPrintedRecords(store));

  useEffect(() => {
    const refresh = () => setHistory(listPrintedRecords(store));
    window.addEventListener("kids-history", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("kids-history", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [store]);

  return (
    <PrintHistoryList
      heading="Printed packs"
      empty="Nothing printed yet on this browser. History is saved after you print."
      records={history}
    />
  );
}
