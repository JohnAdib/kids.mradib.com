import { pickInteger } from "../../rng/pickInteger";
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
  const decoys: number[] = [];
  while (decoys.length < 16) {
    const candidate = pickInteger(next, 1, Math.max(24, focus * 12));
    if (!multiples.includes(candidate) && !decoys.includes(candidate)) {
      decoys.push(candidate);
    }
  }
  const keep = shuffleCopy(multiples, next).slice(0, 9);
  return {
    focus,
    cells: shuffleCopy([...keep, ...decoys], next).slice(0, 25),
  };
}
