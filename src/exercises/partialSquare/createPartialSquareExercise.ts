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
  const focus = new Set(tables.filter((table) => table > 0));
  const cells = timesTableFactors.map((row) =>
    timesTableFactors.map((col) => {
      const onFocus = focus.size === 0 || focus.has(row);
      return next() < (onFocus ? 0.55 : 0.2) ? null : row * col;
    }),
  );
  return {
    headers: [...timesTableFactors],
    rows: [...timesTableFactors],
    cells,
  };
}
