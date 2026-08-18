import { expect, test } from "vitest";
import { priorTables } from "./priorTables";
import { ukYearTables } from "./ukYearTables";

test("year 3 tables match the UK map", () => {
  expect([...ukYearTables[3]]).toEqual([2, 3, 4, 5, 10]);
});

test("focus 7 keeps every table taught before it", () => {
  expect(priorTables(7)).toEqual([0, 1, 2, 5, 10, 3, 4, 6, 8]);
});

test("focus 2 only reviews 0 and 1", () => {
  expect(priorTables(2)).toEqual([0, 1]);
});
