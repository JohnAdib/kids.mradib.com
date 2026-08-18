import { expect, test } from "vitest";
import { createMemoryStore } from "../storage/createMemoryStore";
import { listPrintedRecords } from "./listPrintedRecords";
import { recordPrintedRecord } from "./recordPrintedRecord";

test("history keeps the latest prints and caps at forty", () => {
  const store = createMemoryStore();
  for (let i = 0; i < 42; i += 1) {
    recordPrintedRecord(store, {
      kind: "pack",
      label: `2× M #${i}`,
      machineId: `2-m-${i}-abcd`,
      seed: "abcd",
      sequence: i,
      tables: [2],
      includePrior: true,
      includeAnswers: false,
      font: "clear",
      colour: "ink",
      printedAt: `2026-01-01T00:00:${String(i).padStart(2, "0")}Z`,
    });
  }
  const listed = listPrintedRecords(store);
  expect(listed).toHaveLength(40);
  expect(listed[0]?.sequence).toBe(41);
});
