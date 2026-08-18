import { takeAscendingOutside } from "../../numbers/takeAscendingOutside";
import { shuffleCopy } from "../../rng/shuffleCopy";
import type { ColourGrid } from "./ColourGrid";

type Input = {
  focus: number;
  next: () => number;
};

export function createColourMultiplesExercise({
  focus,
  next,
}: Input): ColourGrid {
  const multiples = Array.from({ length: 13 }, (_, i) => focus * i);
  const decoys = shuffleCopy(takeAscendingOutside(multiples, 16), next);
  const keep = shuffleCopy(multiples, next).slice(0, 9);
  return {
    focus,
    cells: shuffleCopy([...keep, ...decoys], next).slice(0, 25),
  };
}
