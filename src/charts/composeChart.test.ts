import { expect, test } from "vitest";
import { composeChart } from "./composeChart";

test("a times table is a square of consecutive factors", () => {
  expect(composeChart({ includeZero: false, lastFactor: 12 })).toEqual([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
});

test("zero can sit on the first row and column", () => {
  expect(composeChart({ includeZero: true, lastFactor: 12 })[0]).toBe(0);
  expect(composeChart({ includeZero: true, lastFactor: 12 })).toHaveLength(13);
});
