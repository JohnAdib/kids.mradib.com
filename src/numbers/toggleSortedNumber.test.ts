import { expect, test } from "vitest";
import { toggleSortedNumber } from "./toggleSortedNumber";

test("toggles a number in and out while staying sorted", () => {
  expect(toggleSortedNumber([2, 5], 10)).toEqual([2, 5, 10]);
  expect(toggleSortedNumber([2, 5, 10], 5)).toEqual([2, 10]);
});
