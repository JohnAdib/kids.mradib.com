import { expect, test } from "vitest";
import { packTablesFromRecord } from "./packTablesFromRecord";

test("falls back to the stored focus when tables are missing", () => {
  expect(packTablesFromRecord([], 7)).toEqual([7]);
  expect(packTablesFromRecord([1, 2, 3])).toEqual([1, 2, 3]);
});
