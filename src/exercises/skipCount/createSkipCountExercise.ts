import { pickInteger } from "../../rng/pickInteger";
import type { SkipCountItem } from "./SkipCountItem";

type Input = {
  tables: number[];
  count: number;
  next: () => number;
};

export function createSkipCountExercise({
  tables,
  count,
  next,
}: Input): SkipCountItem[] {
  const usable = tables.filter((table) => table > 0);
  return Array.from({ length: count }, (_, index) => {
    const step = usable[index % usable.length] ?? 2;
    const start = pickInteger(next, 1, 3) * step;
    const sequence = Array.from({ length: 6 }, (_, i) => start + i * step);
    const answers: number[] = [];
    const values = sequence.map((value, i) => {
      if (i === 0 || i === 2 || i === 4) {
        return value;
      }
      answers.push(value);
      return null;
    });
    return { step, values, answers };
  });
}
