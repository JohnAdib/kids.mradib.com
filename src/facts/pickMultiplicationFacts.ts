import { shuffleCopy } from "../rng/shuffleCopy";
import { buildFactPool } from "./buildFactPool";
import type { MultiplicationFact } from "./MultiplicationFact";

type PickFactsInput = {
  tables: number[];
  count: number;
  next: () => number;
};

export function pickMultiplicationFacts({
  tables,
  count,
  next,
}: PickFactsInput): MultiplicationFact[] {
  const usable = tables.length > 0 ? tables : [2];
  return takeCycled(shuffleCopy(buildFactPool(usable), next), count);
}

function takeCycled<T>(items: T[], count: number) {
  if (items.length === 0 || count <= 0) {
    return [] as T[];
  }
  const taken: T[] = [];
  for (let i = 0; i < count; i += 1) {
    const item = items[i % items.length];
    if (item !== undefined) {
      taken.push(item);
    }
  }
  return taken;
}
