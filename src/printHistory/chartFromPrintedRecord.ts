import { composeChart } from "../charts/composeChart";
import type { ReferenceChart } from "../charts/ReferenceChart";
import type { PrintedRecord } from "./PrintedRecord";

export function chartFromPrintedRecord(record: PrintedRecord): ReferenceChart {
  const includeZero = record.tables.includes(0);
  const lastFactor = record.tables.length > 0 ? Math.max(...record.tables) : 12;
  const tables = composeChart({ includeZero, lastFactor });
  return {
    label: record.label,
    machineId: record.machineId,
    seed: record.seed,
    sequence: record.sequence,
    tables,
    colouring: record.colouring ?? "none",
  };
}
