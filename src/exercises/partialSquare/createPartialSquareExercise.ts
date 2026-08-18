import type { PartialSquare } from "./PartialSquare";

type Input = {
  tables: number[];
  next: () => number;
};

export function createPartialSquareExercise({
  tables,
  next,
}: Input): PartialSquare {
  const headers = [1, 2, 3, 4, 5, 6, 7, 8];
  const rows = tables.filter((table) => table > 0).slice(0, 4);
  const cells = rows.map((row) =>
    headers.map((col) => (next() < 0.45 ? null : row * col)),
  );
  return { headers, rows, cells };
}
