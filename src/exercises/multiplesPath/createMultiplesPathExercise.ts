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
  return Array.from({ length: 16 }, (_, index) => {
    const onPath = index === 0 || next() < 0.45;
    if (onPath) {
      const multiple = focus * pickInteger(next, 1, 12);
      return { value: multiple, onPath: true };
    }
    let decoy = pickInteger(next, 1, focus * 12);
    while (decoy % focus === 0) {
      decoy = pickInteger(next, 1, focus * 12 + 7);
    }
    return { value: decoy, onPath: false };
  });
}
