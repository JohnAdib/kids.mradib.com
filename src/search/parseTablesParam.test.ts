import { expect, test } from "vitest";
import { parseTablesParam } from "./parseTablesParam";

test("reads commas, hyphen lists, and a two-number range", () => {
  expect(parseTablesParam("1,2,3")).toEqual([1, 2, 3]);
  expect(parseTablesParam("1-2-3")).toEqual([1, 2, 3]);
  expect(parseTablesParam("1-3")).toEqual([1, 2, 3]);
  expect(parseTablesParam("2,5,10")).toEqual([2, 5, 10]);
});
