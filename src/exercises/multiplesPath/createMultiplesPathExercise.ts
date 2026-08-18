import { takeAscendingOutside } from "../../numbers/takeAscendingOutside";
import { pickInteger } from "../../rng/pickInteger";
import type { PathCell } from "./PathCell";

type Input = {
  focus: number;
  next: () => number;
};

export function createMultiplesPathExercise({
  focus,
  next,
}: Input): PathCell[] {
  const table = new Set(Array.from({ length: 13 }, (_, i) => focus * i));
  const decoys = takeAscendingOutside(table, 24);
  return Array.from({ length: 16 }, (_, index) => {
    const onPath = index === 0 || next() < 0.45;
    if (onPath) {
      return { value: focus * pickInteger(next, 1, 12), onPath: true };
    }
    return {
      value: decoys[pickInteger(next, 0, decoys.length - 1)] ?? 1,
      onPath: false,
    };
  });
}
