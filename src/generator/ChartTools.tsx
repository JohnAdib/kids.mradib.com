import { useEffect, useState } from "react";
import type { ChartGroup } from "../charts/ChartGroup";
import { composeChart } from "../charts/composeChart";
import type { ReferenceChart } from "../charts/ReferenceChart";
import { ukYearTables } from "../curriculum/ukYearTables";
import { formatChartLabel } from "../pack/formatChartLabel";
import { formatChartMachineId } from "../pack/formatChartMachineId";
import { nextSequence } from "../pack/nextSequence";
import { sequenceKey } from "../pack/sequenceKey";
import { PrintChart } from "../print/PrintChart";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { PrintPortal } from "../print/PrintPortal";
import { PrintPreviewBar } from "../print/PrintPreviewBar";
import { listPrintedRecordsByKind } from "../printHistory/listPrintedRecordsByKind";
import type { PrintedRecord } from "../printHistory/PrintedRecord";
import { recordPrintedRecord } from "../printHistory/recordPrintedRecord";
import { createSeededRandom } from "../rng/createSeededRandom";
import { makeShortSeed } from "../rng/makeShortSeed";
import { browserStore } from "../storage/browserStore";
import { ChartForm } from "./ChartForm";
import { PrintHistoryList } from "./PrintHistoryList";
import { selectedChartTables } from "./selectedChartTables";
import { YearMap } from "./YearMap";

export function ChartTools() {
  const store = browserStore();
  const [font, setFont] = useState<PrintFont>("clear");
  const [colour, setColour] = useState<PrintColour>("ink");
  const [year, setYear] = useState<keyof typeof ukYearTables | "custom">(2);
  const [customTables, setCustomTables] = useState<number[]>([2, 5, 10]);
  const [includeZeroAndOne, setIncludeZeroAndOne] = useState(true);
  const [includeInverses, setIncludeInverses] = useState(true);
  const [chart, setChart] = useState<ReferenceChart | null>(null);
  const [groups, setGroups] = useState<ChartGroup[]>([]);
  const [history, setHistory] = useState<PrintedRecord[]>(() =>
    listPrintedRecordsByKind(store, "chart"),
  );

  const tables = selectedChartTables(year, customTables, includeZeroAndOne);

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
        includeInverses: chart.includeInverses,
        font,
        colour,
        printedAt: new Date().toISOString(),
      });
      setHistory(listPrintedRecordsByKind(store, "chart"));
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

  function generateChart(from?: PrintedRecord) {
    const nextTables = from?.tables ?? tables;
    if (nextTables.length === 0) {
      return;
    }
    const sequence =
      from?.sequence ??
      nextSequence(store, sequenceKey("chart", nextTables.join("-"), "all"));
    const seed =
      from?.seed ??
      makeShortSeed(createSeededRandom(`${Date.now()}-chart-${sequence}`));
    const nextChart: ReferenceChart = {
      label: formatChartLabel(nextTables, sequence),
      machineId: formatChartMachineId(nextTables, sequence, seed),
      seed,
      sequence,
      tables: nextTables,
      includeInverses: from?.includeInverses ?? includeInverses,
    };
    setChart(nextChart);
    setGroups(
      composeChart({
        tables: nextTables,
        includeInverses: nextChart.includeInverses,
      }),
    );
    document.title = nextChart.machineId;
  }

  function reprint(record: PrintedRecord) {
    setFont(record.font);
    setColour(record.colour);
    setYear("custom");
    setCustomTables(record.tables);
    generateChart(record);
  }

  return (
    <>
      <ChartForm
        year={year}
        tables={tables}
        includeZeroAndOne={includeZeroAndOne}
        includeInverses={includeInverses}
        font={font}
        colour={colour}
        onYear={(nextYear) => {
          setYear(nextYear);
          if (nextYear !== "custom") {
            setCustomTables([...ukYearTables[nextYear]]);
          }
        }}
        onToggleTable={(table) => {
          setYear("custom");
          setCustomTables((current) =>
            current.includes(table)
              ? current.filter((item) => item !== table)
              : [...current, table].sort((a, b) => a - b),
          );
        }}
        onIncludeZeroAndOne={setIncludeZeroAndOne}
        onIncludeInverses={setIncludeInverses}
        onFont={setFont}
        onColour={setColour}
        onGenerate={() => generateChart()}
        onPrint={() => window.print()}
        canPrint={Boolean(chart)}
      />
      <div className="stack-gap">
        <PrintHistoryList
          heading="Printed charts"
          empty="Nothing printed yet on this browser. History is saved after you print."
          records={history}
          onReprint={reprint}
        />
      </div>
      <YearMap />
      {chart ? (
        <PrintPortal>
          <PrintPreviewBar
            label="A4 chart pages. Print them, or save as PDF."
            onPrint={() => window.print()}
          />
          <PrintChart
            chart={chart}
            groups={groups}
            font={font}
            colour={colour}
          />
        </PrintPortal>
      ) : null}
    </>
  );
}
