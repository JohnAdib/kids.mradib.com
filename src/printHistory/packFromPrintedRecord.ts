import { composePack } from "../pack/composePack";
import type { PrintedRecord } from "./PrintedRecord";
import { packTablesFromRecord } from "./packTablesFromRecord";

export function packFromPrintedRecord(record: PrintedRecord) {
  return composePack({
    tables: packTablesFromRecord(record.tables, record.focus),
    stage: record.stage ?? "multiply",
    seed: record.seed,
    sequence: record.sequence,
  });
}
