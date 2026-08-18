import type { PrintedRecord } from "../printHistory/PrintedRecord";
import { packTablesFromRecord } from "../printHistory/packTablesFromRecord";
import { chartPageHref } from "./chartPageHref";
import { packPageHref } from "./packPageHref";

export function printedRecordHref(record: PrintedRecord) {
  if (record.kind === "chart") {
    const lastFactor =
      record.tables.length > 0 ? Math.max(...record.tables) : 12;
    return chartPageHref({
      lastFactor: lastFactor === 10 ? 10 : 12,
      includeZero: record.tables.includes(0),
      colouring: record.colouring ?? "squares",
      font: record.font,
      colour: record.colour,
      seed: record.seed,
      sequence: record.sequence,
    });
  }
  return packPageHref({
    tables: packTablesFromRecord(record.tables, record.focus),
    stage: record.stage ?? "multiply",
    font: record.font,
    colour: record.colour,
    includeAnswers: record.includeAnswers,
    seed: record.seed,
    sequence: record.sequence,
  });
}
