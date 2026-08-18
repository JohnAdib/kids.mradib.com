import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ChartGroup } from "../charts/ChartGroup";
import { composeChart } from "../charts/composeChart";
import type { ReferenceChart } from "../charts/ReferenceChart";
import { ukYearTables } from "../curriculum/ukYearTables";
import type { Stage } from "../facts/Stage";
import { composePack } from "../pack/composePack";
import { formatChartLabel } from "../pack/formatChartLabel";
import { formatChartMachineId } from "../pack/formatChartMachineId";
import { nextSequence } from "../pack/nextSequence";
import type { PracticePack } from "../pack/PracticePack";
import { sequenceKey } from "../pack/sequenceKey";
import { AnswerPage } from "../print/AnswerPage";
import { PrintChart } from "../print/PrintChart";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { PrintPack } from "../print/PrintPack";
import { listPrintedRecords } from "../printHistory/listPrintedRecords";
import type { PrintedRecord } from "../printHistory/PrintedRecord";
import { recordPrintedRecord } from "../printHistory/recordPrintedRecord";
import { createSeededRandom } from "../rng/createSeededRandom";
import { makeShortSeed } from "../rng/makeShortSeed";
import { browserStore } from "../storage/browserStore";
import { ChartForm } from "./ChartForm";
import { PedagogySection } from "./PedagogySection";
import { PracticeForm } from "./PracticeForm";
import { PrintHistoryList } from "./PrintHistoryList";
import { PrintSettings } from "./PrintSettings";
import { selectedChartTables } from "./selectedChartTables";
import { YearMap } from "./YearMap";

export function TimesTablesTools() {
  const store = browserStore();
  const [focus, setFocus] = useState(2);
  const [stage, setStage] = useState<Stage>("multiply");
  const [includePrior, setIncludePrior] = useState(true);
  const [includeAnswers, setIncludeAnswers] = useState(false);
  const [font, setFont] = useState<PrintFont>("clear");
  const [colour, setColour] = useState<PrintColour>("ink");
  const [year, setYear] = useState<keyof typeof ukYearTables | "custom">(2);
  const [customTables, setCustomTables] = useState<number[]>([2, 5, 10]);
  const [includeZeroAndOne, setIncludeZeroAndOne] = useState(true);
  const [includeInverses, setIncludeInverses] = useState(true);
  const [pack, setPack] = useState<PracticePack | null>(null);
  const [chart, setChart] = useState<ReferenceChart | null>(null);
  const [groups, setGroups] = useState<ChartGroup[]>([]);
  const [history, setHistory] = useState<PrintedRecord[]>(() =>
    listPrintedRecords(store),
  );

  const tables = selectedChartTables(year, customTables, includeZeroAndOne);

  useEffect(() => {
    const onAfterPrint = () => {
      const printedAt = new Date().toISOString();
      if (pack) {
        recordPrintedRecord(store, {
          kind: "pack",
          label: pack.label,
          machineId: pack.machineId,
          seed: pack.seed,
          sequence: pack.sequence,
          focus: pack.focus,
          tables: [pack.focus],
          stage: pack.stage,
          includePrior: pack.includePrior,
          includeAnswers,
          font,
          colour,
          printedAt,
        });
      } else if (chart) {
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
          printedAt,
        });
      }
      setHistory(listPrintedRecords(store));
    };
    window.addEventListener("afterprint", onAfterPrint);
    return () => window.removeEventListener("afterprint", onAfterPrint);
  }, [pack, chart, includeAnswers, font, colour, store]);

  function generatePack(from?: PrintedRecord) {
    const nextFocus = from?.focus ?? focus;
    const nextStage = from?.stage ?? stage;
    const nextPrior = from?.includePrior ?? includePrior;
    const sequence =
      from?.sequence ??
      nextSequence(store, sequenceKey("pack", nextFocus, nextStage));
    const seed =
      from?.seed ??
      makeShortSeed(createSeededRandom(`${Date.now()}-${sequence}`));
    const nextPack = composePack({
      focus: nextFocus,
      stage: nextStage,
      includePrior: nextPrior,
      seed,
      sequence,
    });
    setPack(nextPack);
    setChart(null);
    document.title = nextPack.machineId;
  }

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
    setPack(null);
    document.title = nextChart.machineId;
  }

  function reprint(record: PrintedRecord) {
    setFont(record.font);
    setColour(record.colour);
    setIncludeAnswers(record.includeAnswers);
    if (record.kind === "pack" && record.focus && record.stage) {
      setFocus(record.focus);
      setStage(record.stage);
      setIncludePrior(record.includePrior);
      generatePack(record);
      return;
    }
    setYear("custom");
    setCustomTables(record.tables);
    generateChart(record);
  }

  return (
    <>
      <div className="card-grid">
        <PracticeForm
          focus={focus}
          stage={stage}
          includePrior={includePrior}
          includeAnswers={includeAnswers}
          onFocus={setFocus}
          onStage={setStage}
          onIncludePrior={setIncludePrior}
          onIncludeAnswers={setIncludeAnswers}
          onGenerate={() => generatePack()}
          onPrint={() => window.print()}
          canPrint={Boolean(pack)}
        />
        <ChartForm
          year={year}
          tables={tables}
          includeZeroAndOne={includeZeroAndOne}
          includeInverses={includeInverses}
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
          onGenerate={() => generateChart()}
          onPrint={() => window.print()}
          canPrint={Boolean(chart)}
        />
      </div>
      <section className="tool-panel stack-gap">
        <h2>Print look</h2>
        <PrintSettings
          font={font}
          colour={colour}
          onFont={setFont}
          onColour={setColour}
        />
      </section>
      <div className="stack-gap">
        <PrintHistoryList records={history} onReprint={reprint} />
      </div>
      <PedagogySection />
      <YearMap />
      {(pack || chart) &&
        createPortal(
          <>
            {pack ? (
              <PrintPack pack={pack} font={font} colour={colour} />
            ) : null}
            {pack && includeAnswers ? (
              <AnswerPage pack={pack} font={font} colour={colour} />
            ) : null}
            {chart ? (
              <PrintChart
                chart={chart}
                groups={groups}
                font={font}
                colour={colour}
              />
            ) : null}
          </>,
          document.body,
        )}
    </>
  );
}
