import { printedHistoryKey } from "./printedHistoryKey";
import type { PrintedRecord } from "./PrintedRecord";

type Store = {
  getItem(key: string): string | null;
};

export function listPrintedRecords(store: Store): PrintedRecord[] {
  const raw = store.getItem(printedHistoryKey);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as PrintedRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
