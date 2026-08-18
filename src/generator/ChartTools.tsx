import { useEffect, useState } from "react";
import type { ChartColouring } from "../charts/ChartColouring";
import type { ReferenceChart } from "../charts/ReferenceChart";
import { PrintChart } from "../print/PrintChart";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { PrintPortal } from "../print/PrintPortal";
import { PrintPreviewBar } from "../print/PrintPreviewBar";
import { notifyPrintedHistory } from "../printHistory/notifyPrintedHistory";
import { recordPrintedRecord } from "../printHistory/recordPrintedRecord";
import type { ChartSearch } from "../search/ChartSearch";
import { chartFromSearch } from "../search/chartFromSearch";
import { formatChartSearch } from "../search/formatChartSearch";
import { parseChartSearch } from "../search/parseChartSearch";
import { replacePageSearch } from "../search/replacePageSearch";
import { browserStore } from "../storage/browserStore";
import { ChartForm } from "./ChartForm";

const boot = parseChartSearch(
  typeof window === "undefined" ? "" : window.location.search,
);
const booted =
  boot && typeof localStorage !== "undefined"
    ? chartFromSearch(boot, localStorage)
    : null;

export function ChartTools() {
  const store = browserStore();
  const [font, setFont] = useState<PrintFont>(boot?.font ?? "clear");
  const [colour, setColour] = useState<PrintColour>(boot?.colour ?? "ink");
  const [includeZero, setIncludeZero] = useState(boot?.includeZero ?? false);
  const [lastFactor, setLastFactor] = useState(boot?.lastFactor ?? 12);
  const [colouring, setColouring] = useState<ChartColouring>(
    boot?.colouring ?? "squares",
  );
  const [chart, setChart] = useState<ReferenceChart | null>(
    booted?.chart ?? null,
  );

  useEffect(() => {
    if (booted) {
      document.title = booted.chart.machineId;
      replacePageSearch(formatChartSearch(booted.request));
    }
  }, []);

  useEffect(() => {
    const onAfterPrint = () => {
      if (!chart) {
        return;
      }
      recordPrintedRecord(store, {
        kind: "chart",
        label: chart.label,
        machineId: chart.machineId,
        seed: chart.seed,
        sequence: chart.sequence,
        tables: chart.tables,
        includePrior: false,
        includeAnswers: false,
        colouring: chart.colouring,
        font,
        colour,
        printedAt: new Date().toISOString(),
      });
      notifyPrintedHistory();
    };
    window.addEventListener("afterprint", onAfterPrint);
    return () => window.removeEventListener("afterprint", onAfterPrint);
  }, [chart, font, colour, store]);

  useEffect(() => {
    if (!chart) {
      return;
    }
    document
      .querySelector(".print-toolbar")
      ?.scrollIntoView({ block: "start" });
  }, [chart]);

  function showRequest(request: ChartSearch) {
    const next = chartFromSearch(request, store);
    setIncludeZero(request.includeZero);
    setLastFactor(request.lastFactor);
    setColouring(request.colouring);
    setFont(request.font);
    setColour(request.colour);
    setChart(next.chart);
    document.title = next.chart.machineId;
    replacePageSearch(formatChartSearch(next.request));
  }

  return (
    <>
      <ChartForm
        includeZero={includeZero}
        lastFactor={lastFactor}
        colouring={colouring}
        font={font}
        colour={colour}
        onIncludeZero={setIncludeZero}
        onLastFactor={setLastFactor}
        onColouring={setColouring}
        onFont={setFont}
        onColour={setColour}
        onGenerate={() =>
          showRequest({
            lastFactor,
            includeZero,
            colouring,
            font,
            colour,
          })
        }
        onPrint={() => window.print()}
        canPrint={Boolean(chart)}
      />
      {chart ? (
        <PrintPortal>
          <PrintPreviewBar
            label="This link is the table. Print it, or save as PDF."
            onPrint={() => window.print()}
          />
          <PrintChart chart={chart} font={font} colour={colour} />
        </PrintPortal>
      ) : null}
    </>
  );
}
