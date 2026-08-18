import { expect, test } from "vitest";
import { formatPackTabTitle } from "./formatPackTabTitle";

test("a pack tab title names the tables in plain words", () => {
  expect(formatPackTabTitle([])).toBe("Times tables practice — Kids");
  expect(formatPackTabTitle([7])).toBe("7 times tables — Kids");
  expect(formatPackTabTitle([2, 5, 10])).toBe("2, 5, 10 times tables — Kids");
});
