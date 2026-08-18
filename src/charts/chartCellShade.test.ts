import { expect, test } from "vitest";
import { chartCellShade } from "./chartCellShade";

test("none is always plain", () => {
  expect(chartCellShade(5, 5, "none")).toBe("plain");
  expect(chartCellShade(2, 9, "none")).toBe("plain");
});

test("an empty grid stays unshaded", () => {
  expect(chartCellShade(5, 5, "blank")).toBe("plain");
  expect(chartCellShade(2, 9, "blank")).toBe("plain");
});

test("squares only marks the diagonal", () => {
  expect(chartCellShade(7, 7, "squares")).toBe("square");
  expect(chartCellShade(7, 8, "squares")).toBe("plain");
});

test("shells follow the outer factor", () => {
  expect(chartCellShade(3, 8, "shells")).toBe("shell-8");
  expect(chartCellShade(8, 3, "shells")).toBe("shell-8");
  expect(chartCellShade(8, 8, "shells")).toBe("shell-8");
});

test("diagonals follow the distance from the square", () => {
  expect(chartCellShade(2, 2, "diagonals")).toBe("diag-0");
  expect(chartCellShade(2, 9, "diagonals")).toBe("diag-7");
  expect(chartCellShade(9, 2, "diagonals")).toBe("diag-7");
});
