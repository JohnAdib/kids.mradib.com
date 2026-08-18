import { useEffect, useRef, useState } from "react";
import type { Stage } from "../facts/Stage";
import { defaultPageCount } from "../pack/defaultPageCount";
import type { PackChallengeId } from "../pack/PackChallengeId";
import type { PracticePack } from "../pack/PracticePack";
import { packChallengeIds } from "../pack/packChallengeIds";
import { AnswerPage } from "../print/AnswerPage";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { PrintPack } from "../print/PrintPack";
import { PrintWorkspace } from "../print/PrintWorkspace";
import { notifyPrintedHistory } from "../printHistory/notifyPrintedHistory";
import { recordPrintedRecord } from "../printHistory/recordPrintedRecord";
import { formatPackSearch } from "../search/formatPackSearch";
import { packFromSearch } from "../search/packFromSearch";
import { parsePackSearch } from "../search/parsePackSearch";
import { replacePageSearch } from "../search/replacePageSearch";
import { browserStore } from "../storage/browserStore";
import { PracticeForm } from "./PracticeForm";

const pageTitle = document.title;
const boot = parsePackSearch(window.location.search);
const booted = boot ? packFromSearch(boot, browserStore()) : null;

export function PracticePackTools() {
  const store = browserStore();
  const seedRef = useRef(booted?.pack.seed);
  const sequenceRef = useRef(booted?.pack.sequence);
  const [tables, setTables] = useState<number[]>(boot?.tables ?? []);
  const [stage, setStage] = useState<Stage>(boot?.stage ?? "multiply");
  const [pageCount, setPageCount] = useState(
    boot?.pageCount ?? defaultPageCount,
  );
  const [challenges, setChallenges] = useState<PackChallengeId[]>(
    boot?.challenges ?? [...packChallengeIds],
  );
  const [includeAnswers, setIncludeAnswers] = useState(
    boot?.includeAnswers ?? false,
  );
  const [font, setFont] = useState<PrintFont>(boot?.font ?? "clear");
  const [colour, setColour] = useState<PrintColour>(boot?.colour ?? "ink");
  const [pack, setPack] = useState<PracticePack | null>(booted?.pack ?? null);

  useEffect(() => {
    if (tables.length === 0) {
      seedRef.current = undefined;
      sequenceRef.current = undefined;
      setPack(null);
      replacePageSearch("");
      document.title = pageTitle;
      return;
    }
    if (challenges.length === 0) {
      setPack(null);
      replacePageSearch(
        formatPackSearch({
          tables,
          stage,
          font,
          colour,
          includeAnswers,
          pageCount,
          challenges,
          seed: seedRef.current,
          sequence: sequenceRef.current,
        }),
      );
      return;
    }
    const next = packFromSearch(
      {
        tables,
        stage,
        font,
        colour,
        includeAnswers,
        pageCount,
        challenges,
        seed: seedRef.current,
        sequence: sequenceRef.current,
      },
      store,
    );
    seedRef.current = next.pack.seed;
    sequenceRef.current = next.pack.sequence;
    setPack(next.pack);
    document.title = next.pack.machineId;
    replacePageSearch(formatPackSearch(next.request));
  }, [
    tables,
    stage,
    pageCount,
    challenges,
    includeAnswers,
    font,
    colour,
    store,
  ]);

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
        pageCount: pack.pageCount,
        challenges: pack.challenges,
        font,
        colour,
        printedAt: new Date().toISOString(),
      });
      notifyPrintedHistory();
    };
    window.addEventListener("afterprint", onAfterPrint);
    return () => window.removeEventListener("afterprint", onAfterPrint);
  }, [pack, includeAnswers, font, colour, store]);

  const form = (
    <PracticeForm
      tables={tables}
      stage={stage}
      pageCount={pageCount}
      challenges={challenges}
      includeAnswers={includeAnswers}
      font={font}
      colour={colour}
      canPrint={pack !== null}
      onTables={setTables}
      onStage={setStage}
      onPageCount={setPageCount}
      onChallenges={setChallenges}
      onIncludeAnswers={setIncludeAnswers}
      onFont={setFont}
      onColour={setColour}
      onPrint={() => window.print()}
    />
  );

  if (!pack) {
    return <div className="print-form-solo screen-only">{form}</div>;
  }

  return (
    <PrintWorkspace
      form={form}
      preview={
        <>
          <PrintPack pack={pack} font={font} colour={colour} />
          {includeAnswers ? (
            <AnswerPage pack={pack} font={font} colour={colour} />
          ) : null}
        </>
      }
    />
  );
}
