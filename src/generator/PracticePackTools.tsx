import { useEffect, useRef, useState } from "react";
import type { Stage } from "../facts/Stage";
import { defaultPackChallengeIds } from "../pack/defaultPackChallengeIds";
import { defaultPageCount } from "../pack/defaultPageCount";
import { formatPackTabTitle } from "../pack/formatPackTabTitle";
import type { PackChallengeId } from "../pack/PackChallengeId";
import type { PracticePack } from "../pack/PracticePack";
import { AnswerPage } from "../print/AnswerPage";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { PrintPack } from "../print/PrintPack";
import { PrintWorkspace } from "../print/PrintWorkspace";
import { WorkspaceEmpty } from "../print/WorkspaceEmpty";
import { notifyPrintedHistory } from "../printHistory/notifyPrintedHistory";
import { recordPrintedRecord } from "../printHistory/recordPrintedRecord";
import { nextPackSeed } from "../rng/nextPackSeed";
import { formatPackSearch } from "../search/formatPackSearch";
import { packFromSearch } from "../search/packFromSearch";
import { parsePackSearch } from "../search/parsePackSearch";
import { replacePageSearch } from "../search/replacePageSearch";
import { browserStore } from "../storage/browserStore";
import { PracticeForm } from "./PracticeForm";
import { PrintBar } from "./PrintBar";

const boot = parsePackSearch(window.location.search);
const booted = boot ? packFromSearch(boot, browserStore()) : null;

export function PracticePackTools() {
  const store = browserStore();
  const sequenceRef = useRef(booted?.pack.sequence);
  const [tables, setTables] = useState<number[]>(boot?.tables ?? []);
  const [stage, setStage] = useState<Stage>(boot?.stage ?? "multiply");
  const [pageCount, setPageCount] = useState(
    boot?.pageCount ?? defaultPageCount,
  );
  const [challenges, setChallenges] = useState<PackChallengeId[]>(
    boot?.challenges ?? [...defaultPackChallengeIds],
  );
  const [includeAnswers, setIncludeAnswers] = useState(
    boot?.includeAnswers ?? false,
  );
  const [font, setFont] = useState<PrintFont>(boot?.font ?? "clear");
  const [colour, setColour] = useState<PrintColour>(boot?.colour ?? "ink");
  const [pack, setPack] = useState<PracticePack | null>(booted?.pack ?? null);
  const [seed, setSeed] = useState(booted?.pack.seed);

  useEffect(() => {
    if (tables.length === 0) {
      sequenceRef.current = undefined;
      setPack(null);
      replacePageSearch("");
      document.title = formatPackTabTitle([]);
      if (seed !== undefined) {
        setSeed(undefined);
      }
      return;
    }
    if (challenges.length === 0) {
      setPack(null);
      document.title = formatPackTabTitle(tables);
      replacePageSearch(
        formatPackSearch({
          tables,
          stage,
          font,
          colour,
          includeAnswers,
          pageCount,
          challenges,
          seed,
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
        seed,
        sequence: sequenceRef.current,
      },
      store,
    );
    sequenceRef.current = next.pack.sequence;
    setPack(next.pack);
    document.title = formatPackTabTitle(next.pack.tables);
    replacePageSearch(formatPackSearch(next.request));
    if (next.pack.seed !== seed) {
      setSeed(next.pack.seed);
    }
  }, [
    tables,
    stage,
    pageCount,
    challenges,
    includeAnswers,
    font,
    colour,
    store,
    seed,
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
      onTables={setTables}
      onStage={(nextStage) => {
        setSeed(undefined);
        setStage(nextStage);
      }}
      onPageCount={setPageCount}
      onChallenges={setChallenges}
      onIncludeAnswers={setIncludeAnswers}
      onFont={setFont}
      onColour={setColour}
    />
  );

  const emptyPrompt =
    tables.length === 0
      ? "Tick a table. The A4 pages will land here."
      : "Tick a challenge. The A4 pages will land here.";

  return (
    <>
      <div className="page-heading screen-only">
        <h1>Practice pack</h1>
        <PrintBar
          canPrint={pack !== null}
          onPrint={() => window.print()}
          onNewSheet={() => {
            sequenceRef.current = (sequenceRef.current ?? 0) + 1;
            setSeed(nextPackSeed());
          }}
        />
      </div>
      <PrintWorkspace
        form={form}
        preview={
          pack ? (
            <>
              <PrintPack pack={pack} font={font} colour={colour} />
              {includeAnswers ? (
                <AnswerPage pack={pack} font={font} colour={colour} />
              ) : null}
            </>
          ) : (
            <WorkspaceEmpty prompt={emptyPrompt} />
          )
        }
      />
    </>
  );
}
