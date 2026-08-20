import { timesTableFactors } from "../../facts/timesTableFactors";
import type { PartialSquare } from "./PartialSquare";

type Input = {
  tables: number[];
};

export function createPartialSquareExercise({ tables }: Input): PartialSquare {
  const focusTables = [...new Set(tables.filter((table) => table > 0))].sort(
    (a, b) => a - b,
  );
  const focus = new Set(focusTables);
  const cells = timesTableFactors.map((row) =>
    timesTableFactors.map((col) => {
      if (focus.size > 0 && (focus.has(row) || focus.has(col))) {
        return null;
      }
      return row * col;
    }),
  );
  return {
    headers: [...timesTableFactors],
    rows: [...timesTableFactors],
    cells,
    focusTables,
  };
}
