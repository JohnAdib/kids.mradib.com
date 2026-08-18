import { useEffect, useState } from "react";
import type { ReferenceChart } from "../charts/ReferenceChart";
import type { PracticePack } from "../pack/PracticePack";
import { AnswerPage } from "../print/AnswerPage";
import { PrintChart } from "../print/PrintChart";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { PrintPack } from "../print/PrintPack";
import { PrintPortal } from "../print/PrintPortal";
import { PrintPreviewBar } from "../print/PrintPreviewBar";
import { chartFromPrintedRecord } from "../printHistory/chartFromPrintedRecord";
import { listPrintedRecords } from "../printHistory/listPrintedRecords";
import type { PrintedRecord } from "../printHistory/PrintedRecord";
import { packFromPrintedRecord } from "../printHistory/packFromPrintedRecord";
import { browserStore } from "../storage/browserStore";
import { PrintHistoryList } from "./PrintHistoryList";

export function PrintsTools() {
  const store = browserStore();
  const [history, setHistory] = useState<PrintedRecord[]>(() =>
    listPrintedRecords(store),
  );
  const [pack, setPack] = useState<PracticePack | null>(null);
  const [chart, setChart] = useState<ReferenceChart | null>(null);
  const [font, setFont] = useState<PrintFont>("clear");
  const [colour, setColour] = useState<PrintColour>("ink");
  const [includeAnswers, setIncludeAnswers] = useState(false);

  useEffect(() => {
    const refresh = () => setHistory(listPrintedRecords(store));
    window.addEventListener("kids-history", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("kids-history", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [store]);

  useEffect(() => {
    if (!pack && !chart) {
      return;
    }
    document
      .querySelector(".print-toolbar")
      ?.scrollIntoView({ block: "start" });
  }, [pack, chart]);

  function reprint(record: PrintedRecord) {
    setFont(record.font);
    setColour(record.colour);
    setIncludeAnswers(record.includeAnswers);
    if (record.kind === "pack") {
      setChart(null);
      const nextPack = packFromPrintedRecord(record);
      setPack(nextPack);
      document.title = nextPack.machineId;
      return;
    }
    setPack(null);
    const nextChart = chartFromPrintedRecord(record);
    setChart(nextChart);
    document.title = nextChart.machineId;
  }

  return (
    <>
      <PrintHistoryList
        heading="Printed packs"
        empty="Nothing printed yet on this browser. History is saved after you print."
        records={history}
        onReprint={reprint}
      />
      {pack ? (
        <PrintPortal>
          <PrintPreviewBar
            label="Reprint these A4 pages, or save as PDF."
            onPrint={() => window.print()}
          />
          <PrintPack pack={pack} font={font} colour={colour} />
          {includeAnswers ? (
            <AnswerPage pack={pack} font={font} colour={colour} />
          ) : null}
        </PrintPortal>
      ) : null}
      {chart ? (
        <PrintPortal>
          <PrintPreviewBar
            label="Reprint this A4 table, or save as PDF."
            onPrint={() => window.print()}
          />
          <PrintChart chart={chart} font={font} colour={colour} />
        </PrintPortal>
      ) : null}
    </>
  );
}
