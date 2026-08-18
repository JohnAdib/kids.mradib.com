import { listPrintedRecords } from "./listPrintedRecords";
import type { PrintedRecord } from "./PrintedRecord";

type Store = {
  getItem(key: string): string | null;
};

export function listPrintedRecordsByKind(
  store: Store,
  kind: PrintedRecord["kind"],
) {
  return listPrintedRecords(store).filter((record) => record.kind === kind);
}
