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
import { notifyPrintedHistory } from "../printHistory/notifyPrintedHistory";
import { recordPrintedRecord } from "../printHistory/recordPrintedRecord";
import { createSeededRandom } from "../rng/createSeededRandom";
import { makeShortSeed } from "../rng/makeShortSeed";
import { browserStore } from "../storage/browserStore";
import { PracticeForm } from "./PracticeForm";

export function PracticePackTools() {
  const store = browserStore();
  const [tables, setTables] = useState<number[]>([2, 5, 10]);
  const [stage, setStage] = useState<Stage>("multiply");
  const [includeAnswers, setIncludeAnswers] = useState(false);
  const [font, setFont] = useState<PrintFont>("clear");
  const [colour, setColour] = useState<PrintColour>("ink");
  const [pack, setPack] = useState<PracticePack | null>(null);

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
        tables: pack.tables,
        stage: pack.stage,
        includePrior: pack.includePrior,
        includeAnswers,
        font,
        colour,
        printedAt: new Date().toISOString(),
      });
      notifyPrintedHistory();
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

  function generatePack() {
    const sequence = nextSequence(
      store,
      sequenceKey("pack", tables.join("-"), stage),
    );
    const seed = makeShortSeed(createSeededRandom(`${Date.now()}-${sequence}`));
    const nextPack = composePack({
      tables,
      stage,
      seed,
      sequence,
    });
    setPack(nextPack);
    document.title = nextPack.machineId;
  }

  return (
    <>
      <PracticeForm
        tables={tables}
        stage={stage}
        includeAnswers={includeAnswers}
        font={font}
        colour={colour}
        onTables={setTables}
        onStage={setStage}
        onIncludeAnswers={setIncludeAnswers}
        onFont={setFont}
        onColour={setColour}
        onGenerate={generatePack}
        onPrint={() => window.print()}
        canPrint={Boolean(pack)}
      />
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
