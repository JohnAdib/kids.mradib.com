import { useEffect, useState } from "react";
import type { Stage } from "../facts/Stage";
import type { PracticePack } from "../pack/PracticePack";
import { AnswerPage } from "../print/AnswerPage";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { PrintPack } from "../print/PrintPack";
import { PrintPortal } from "../print/PrintPortal";
import { PrintPreviewBar } from "../print/PrintPreviewBar";
import { notifyPrintedHistory } from "../printHistory/notifyPrintedHistory";
import { recordPrintedRecord } from "../printHistory/recordPrintedRecord";
import { formatPackSearch } from "../search/formatPackSearch";
import type { PackSearch } from "../search/PackSearch";
import { packFromSearch } from "../search/packFromSearch";
import { parsePackSearch } from "../search/parsePackSearch";
import { replacePageSearch } from "../search/replacePageSearch";
import { browserStore } from "../storage/browserStore";
import { PracticeForm } from "./PracticeForm";

const boot = parsePackSearch(
  typeof window === "undefined" ? "" : window.location.search,
);
const booted =
  boot && typeof localStorage !== "undefined"
    ? packFromSearch(boot, localStorage)
    : null;

export function PracticePackTools() {
  const store = browserStore();
  const [tables, setTables] = useState<number[]>(
    booted?.pack.tables ?? boot?.tables ?? [2, 5, 10],
  );
  const [stage, setStage] = useState<Stage>(
    booted?.pack.stage ?? boot?.stage ?? "multiply",
  );
  const [includeAnswers, setIncludeAnswers] = useState(
    boot?.includeAnswers ?? false,
  );
  const [font, setFont] = useState<PrintFont>(boot?.font ?? "clear");
  const [colour, setColour] = useState<PrintColour>(boot?.colour ?? "ink");
  const [pack, setPack] = useState<PracticePack | null>(booted?.pack ?? null);

  useEffect(() => {
    if (booted) {
      document.title = booted.pack.machineId;
      replacePageSearch(formatPackSearch(booted.request));
    }
  }, []);

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

  function showRequest(request: PackSearch) {
    const next = packFromSearch(request, store);
    setTables(next.pack.tables);
    setStage(next.pack.stage);
    setFont(request.font);
    setColour(request.colour);
    setIncludeAnswers(request.includeAnswers);
    setPack(next.pack);
    document.title = next.pack.machineId;
    replacePageSearch(formatPackSearch(next.request));
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
        onGenerate={() =>
          showRequest({
            tables,
            stage,
            font,
            colour,
            includeAnswers,
          })
        }
        onPrint={() => window.print()}
        canPrint={Boolean(pack)}
      />
      {pack ? (
        <PrintPortal>
          <PrintPreviewBar
            label="This link is the pack. Print it, or save as PDF."
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
