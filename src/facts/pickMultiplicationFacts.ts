import { takeShuffled } from "../rng/takeShuffled";
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
  return takeShuffled(buildFactPool(usable), count, next);
}
