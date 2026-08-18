import type { PartialSquare } from "./PartialSquare";

type Input = {
  tables: number[];
  next: () => number;
};

export function createPartialSquareExercise({
  tables,
  next,
}: Input): PartialSquare {
  const headers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const chosen = tables.filter((table) => table > 0);
  const rows = (chosen.length > 0 ? chosen : [2]).slice(0, 12);
  const cells = rows.map((row) =>
    headers.map((col) => (next() < 0.55 ? null : row * col)),
  );
  return { headers, rows, cells };
}
