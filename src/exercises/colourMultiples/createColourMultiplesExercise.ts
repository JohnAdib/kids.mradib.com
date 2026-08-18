import { takeAscendingOutside } from "../../numbers/takeAscendingOutside";
import { shuffleCopy } from "../../rng/shuffleCopy";
import type { ColourGrid } from "./ColourGrid";

type Input = {
  focus: number;
  next: () => number;
  cellCount?: number;
  columns?: number;
};

export function createColourMultiplesExercise({
  focus,
  next,
  cellCount = 100,
  columns = 10,
}: Input): ColourGrid {
  const multiples = Array.from({ length: 12 }, (_, i) => focus * (i + 1));
  const keepCount = Math.min(multiples.length, Math.ceil(cellCount * 0.35));
  const keep = shuffleCopy(multiples, next).slice(0, keepCount);
  const decoys = shuffleCopy(
    takeAscendingOutside(multiples, cellCount - keep.length),
    next,
  );
  return {
    focus,
    columns,
    cells: shuffleCopy([...keep, ...decoys], next).slice(0, cellCount),
  };
}
