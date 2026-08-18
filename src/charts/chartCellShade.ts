import type { ChartColouring } from "./ChartColouring";

export function chartCellShade(
  row: number,
  column: number,
  colouring: ChartColouring,
) {
  if (colouring === "none") {
    return "plain";
  }
  if (colouring === "squares") {
    return row === column ? "square" : "plain";
  }
  if (colouring === "shells") {
    return `shell-${Math.max(row, column)}`;
  }
  return `diag-${Math.abs(row - column)}`;
}
