import { useEffect, useRef, useState } from "react";
import type { ChartColouring } from "../charts/ChartColouring";
import { formatChartTabTitle } from "../charts/formatChartTabTitle";
import type { ReferenceChart } from "../charts/ReferenceChart";
import { PrintChart } from "../print/PrintChart";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { PrintWorkspace } from "../print/PrintWorkspace";
import { notifyPrintedHistory } from "../printHistory/notifyPrintedHistory";
import { recordPrintedRecord } from "../printHistory/recordPrintedRecord";
import type { ChartSearch } from "../search/ChartSearch";
import { chartFromSearch } from "../search/chartFromSearch";
import { formatChartSearch } from "../search/formatChartSearch";
import { parseChartSearch } from "../search/parseChartSearch";
import { replacePageSearch } from "../search/replacePageSearch";
import { browserStore } from "../storage/browserStore";
import { ChartForm } from "./ChartForm";

const fallback: ChartSearch = {
  lastFactor: 12,
  includeZero: false,
  colouring: "squares",
  font: "clear",
  colour: "ink",
};

const boot = parseChartSearch(window.location.search) ?? fallback;
const booted = chartFromSearch(boot, browserStore());

export function ChartTools() {
  const store = browserStore();
  const seedRef = useRef(booted.chart.seed);
  const sequenceRef = useRef(booted.chart.sequence);
  const [font, setFont] = useState<PrintFont>(boot.font);
  const [colour, setColour] = useState<PrintColour>(boot.colour);
  const [includeZero, setIncludeZero] = useState(boot.includeZero);
  const [lastFactor, setLastFactor] = useState(boot.lastFactor);
  const [colouring, setColouring] = useState<ChartColouring>(boot.colouring);
  const [chart, setChart] = useState<ReferenceChart>(booted.chart);

  useEffect(() => {
    const next = chartFromSearch(
      {
        lastFactor,
        includeZero,
        colouring,
        font,
        colour,
        seed: seedRef.current,
        sequence: sequenceRef.current,
      },
      store,
    );
    seedRef.current = next.chart.seed;
    sequenceRef.current = next.chart.sequence;
    setChart(next.chart);
    document.title = formatChartTabTitle(lastFactor);
    replacePageSearch(formatChartSearch(next.request));
  }, [lastFactor, includeZero, colouring, font, colour, store]);

  useEffect(() => {
    const onAfterPrint = () => {
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

  return (
    <PrintWorkspace
      form={
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
          onPrint={() => window.print()}
        />
      }
      preview={<PrintChart chart={chart} font={font} colour={colour} />}
    />
  );
}
