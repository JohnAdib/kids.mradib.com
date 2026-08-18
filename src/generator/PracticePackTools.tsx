import { useEffect, useState } from "react";
import type { Stage } from "../facts/Stage";
import { composePack } from "../pack/composePack";
import { nextSequence } from "../pack/nextSequence";
import type { PracticePack } from "../pack/PracticePack";
import { sequenceKey } from "../pack/sequenceKey";
import { AnswerPage } from "../print/AnswerPage";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { PrintPack } from "../print/PrintPack";
import { PrintPortal } from "../print/PrintPortal";
import { PrintPreviewBar } from "../print/PrintPreviewBar";
import { listPrintedRecordsByKind } from "../printHistory/listPrintedRecordsByKind";
import type { PrintedRecord } from "../printHistory/PrintedRecord";
import { recordPrintedRecord } from "../printHistory/recordPrintedRecord";
import { createSeededRandom } from "../rng/createSeededRandom";
import { makeShortSeed } from "../rng/makeShortSeed";
import { browserStore } from "../storage/browserStore";
import { PedagogySection } from "./PedagogySection";
import { PracticeForm } from "./PracticeForm";
import { PrintHistoryList } from "./PrintHistoryList";

export function PracticePackTools() {
  const store = browserStore();
  const [focus, setFocus] = useState(2);
  const [stage, setStage] = useState<Stage>("multiply");
  const [includePrior, setIncludePrior] = useState(true);
  const [includeAnswers, setIncludeAnswers] = useState(false);
  const [font, setFont] = useState<PrintFont>("clear");
  const [colour, setColour] = useState<PrintColour>("ink");
  const [pack, setPack] = useState<PracticePack | null>(null);
  const [history, setHistory] = useState<PrintedRecord[]>(() =>
    listPrintedRecordsByKind(store, "pack"),
  );

  useEffect(() => {
    const onAfterPrint = () => {
      if (!pack) {
        return;
      }
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
        printedAt: new Date().toISOString(),
      });
      setHistory(listPrintedRecordsByKind(store, "pack"));
    };
    window.addEventListener("afterprint", onAfterPrint);
    return () => window.removeEventListener("afterprint", onAfterPrint);
  }, [pack, includeAnswers, font, colour, store]);

  useEffect(() => {
    if (!pack) {
      return;
    }
    document
      .querySelector(".print-toolbar")
      ?.scrollIntoView({ block: "start" });
  }, [pack]);

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
    document.title = nextPack.machineId;
  }

  function reprint(record: PrintedRecord) {
    setFont(record.font);
    setColour(record.colour);
    setIncludeAnswers(record.includeAnswers);
    if (record.focus && record.stage) {
      setFocus(record.focus);
      setStage(record.stage);
      setIncludePrior(record.includePrior);
    }
    generatePack(record);
  }

  return (
    <>
      <PracticeForm
        focus={focus}
        stage={stage}
        includePrior={includePrior}
        includeAnswers={includeAnswers}
        font={font}
        colour={colour}
        onFocus={setFocus}
        onStage={setStage}
        onIncludePrior={setIncludePrior}
        onIncludeAnswers={setIncludeAnswers}
        onFont={setFont}
        onColour={setColour}
        onGenerate={() => generatePack()}
        onPrint={() => window.print()}
        canPrint={Boolean(pack)}
      />
      <div className="stack-gap">
        <PrintHistoryList
          heading="Printed packs"
          empty="Nothing printed yet on this browser. History is saved after you print."
          records={history}
          onReprint={reprint}
        />
      </div>
      <PedagogySection />
      {pack ? (
        <PrintPortal>
          <PrintPreviewBar
            label="Four A4 pages. Print them, or save as PDF."
            onPrint={() => window.print()}
          />
          <PrintPack pack={pack} font={font} colour={colour} />
          {includeAnswers ? (
            <AnswerPage pack={pack} font={font} colour={colour} />
          ) : null}
        </PrintPortal>
      ) : null}
    </>
  );
}
