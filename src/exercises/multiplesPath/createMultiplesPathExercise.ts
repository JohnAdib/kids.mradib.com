import { takeAscendingOutside } from "../../numbers/takeAscendingOutside";
import { pickInteger } from "../../rng/pickInteger";
import type { PathCell } from "./PathCell";

type Input = {
  focus: number;
  next: () => number;
  cellCount?: number;
};

export function createMultiplesPathExercise({
  focus,
  next,
  cellCount = 64,
}: Input): PathCell[] {
  const table = new Set(Array.from({ length: 12 }, (_, i) => focus * (i + 1)));
  const decoys = takeAscendingOutside(table, 36);
  return Array.from({ length: cellCount }, (_, index) => {
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
