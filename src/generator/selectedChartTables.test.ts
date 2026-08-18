import { expect, test } from "vitest";
import { selectedChartTables } from "./selectedChartTables";

test("year 3 plus 0 and 1 keeps the school set", () => {
  expect(selectedChartTables(3, [], true)).toEqual([0, 1, 2, 3, 4, 5, 10]);
});

test("custom ticks stay as chosen", () => {
  expect(selectedChartTables("custom", [2, 3, 5, 10], false)).toEqual([
    2, 3, 5, 10,
  ]);
});
