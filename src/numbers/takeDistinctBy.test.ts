import { expect, test } from "vitest";
import { takeDistinctBy } from "./takeDistinctBy";

test("keeps the first items whose keys have not been seen", () => {
  expect(
    takeDistinctBy(
      [
        { left: "2 × 1", right: "2" },
        { left: "2 ÷ 1", right: "2" },
        { left: "5 × 2", right: "10" },
        { left: "5 × 2", right: "10" },
        { left: "4 × 2", right: "8" },
      ],
      (pair) => [`left:${pair.left}`, `right:${pair.right}`],
      4,
    ),
  ).toEqual([
    { left: "2 × 1", right: "2" },
    { left: "5 × 2", right: "10" },
    { left: "4 × 2", right: "8" },
  ]);
});
