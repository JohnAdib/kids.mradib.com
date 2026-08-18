import { useEffect, useState } from "react";
import type { ChartColouring } from "../charts/ChartColouring";
import { composeChart } from "../charts/composeChart";
import type { ReferenceChart } from "../charts/ReferenceChart";
import { formatChartLabel } from "../pack/formatChartLabel";
import { formatChartMachineId } from "../pack/formatChartMachineId";
import { nextSequence } from "../pack/nextSequence";
import { sequenceKey } from "../pack/sequenceKey";
import { PrintChart } from "../print/PrintChart";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { PrintPortal } from "../print/PrintPortal";
import { PrintPreviewBar } from "../print/PrintPreviewBar";
import { notifyPrintedHistory } from "../printHistory/notifyPrintedHistory";
import { recordPrintedRecord } from "../printHistory/recordPrintedRecord";
import { createSeededRandom } from "../rng/createSeededRandom";
import { makeShortSeed } from "../rng/makeShortSeed";
import { browserStore } from "../storage/browserStore";
import { ChartForm } from "./ChartForm";

export function ChartTools() {
  const store = browserStore();
  const [font, setFont] = useState<PrintFont>("clear");
  const [colour, setColour] = useState<PrintColour>("ink");
  const [includeZero, setIncludeZero] = useState(false);
  const [lastFactor, setLastFactor] = useState(12);
  const [colouring, setColouring] = useState<ChartColouring>("squares");
  const [chart, setChart] = useState<ReferenceChart | null>(null);

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

  function generateChart() {
    const factors = composeChart({ includeZero, lastFactor });
    const sequence = nextSequence(
      store,
      sequenceKey("chart", factors.join("-"), "all"),
    );
    const seed = makeShortSeed(
      createSeededRandom(`${Date.now()}-chart-${sequence}`),
    );
    const nextChart: ReferenceChart = {
      label: formatChartLabel(factors, sequence),
      machineId: formatChartMachineId(factors, sequence, seed),
      seed,
      sequence,
      tables: factors,
      colouring,
    };
    setChart(nextChart);
    document.title = nextChart.machineId;
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
        onGenerate={generateChart}
        onPrint={() => window.print()}
        canPrint={Boolean(chart)}
      />
      {chart ? (
        <PrintPortal>
          <PrintPreviewBar
            label="One A4 times table. Print it, or save as PDF."
            onPrint={() => window.print()}
          />
          <PrintChart chart={chart} font={font} colour={colour} />
        </PrintPortal>
      ) : null}
    </>
  );
}
