import { listPrintedRecords } from "./listPrintedRecords";
import type { PrintedRecord } from "./PrintedRecord";
import { printedHistoryKey } from "./printedHistoryKey";

type Store = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

export function recordPrintedRecord(store: Store, record: PrintedRecord) {
  const next = [record, ...listPrintedRecords(store)].slice(0, 40);
  store.setItem(printedHistoryKey, JSON.stringify(next));
  return next;
}
