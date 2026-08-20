import { timesTableFactors } from "../../facts/timesTableFactors";
import type { PartialSquare } from "./PartialSquare";

type Input = {
  tables: number[];
  next: () => number;
};

export function createPartialSquareExercise({
  tables,
  next,
}: Input): PartialSquare {
  const focusTables = [...new Set(tables.filter((table) => table > 0))].sort(
    (a, b) => a - b,
  );
  const focus = new Set(focusTables);
  const cells = timesTableFactors.map((row) =>
    timesTableFactors.map((col) => {
      const onFocus = focus.size === 0 || focus.has(row);
      if (!onFocus) {
        return row * col;
      }
      return next() < 0.55 ? null : row * col;
    }),
  );
  return {
    headers: [...timesTableFactors],
    rows: [...timesTableFactors],
    cells,
    focusTables,
  };
}
