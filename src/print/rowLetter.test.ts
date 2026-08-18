import { expect, test } from "vitest";
import { rowLetter } from "./rowLetter";

test("labels rows A then B", () => {
  expect(rowLetter(0)).toBe("A");
  expect(rowLetter(1)).toBe("B");
  expect(rowLetter(25)).toBe("Z");
});
