import { expect, test } from "vitest";
import { partialSquareHelpText } from "./partialSquareHelpText";

test("names a single selected table", () => {
  expect(partialSquareHelpText([2])).toBe(
    "Complete the 2 times table. Fill every empty box.",
  );
});

test("names several selected tables", () => {
  expect(partialSquareHelpText([2, 5])).toBe(
    "Complete the 2, 5 times tables. Fill every empty box.",
  );
});
