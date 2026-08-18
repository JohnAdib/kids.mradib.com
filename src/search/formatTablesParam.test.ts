import { expect, test } from "vitest";
import { formatTablesParam } from "./formatTablesParam";

test("writes a range when tables run in order", () => {
  expect(formatTablesParam([1, 2, 3])).toBe("1-3");
  expect(formatTablesParam([2, 5, 10])).toBe("2,5,10");
  expect(formatTablesParam([7])).toBe("7");
});
