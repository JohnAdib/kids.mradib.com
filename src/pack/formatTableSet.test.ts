import { expect, test } from "vitest";
import { formatTableSet } from "./formatTableSet";

test("consecutive tables collapse to a range", () => {
  expect(formatTableSet([1, 2, 3])).toBe("1–3");
  expect(formatTableSet([2])).toBe("2");
  expect(formatTableSet([2, 5, 10])).toBe("2, 5, 10");
});
