import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import type { ArrayItem } from "./ArrayItem";
import { uniqueArrayItems } from "./uniqueArrayItems";

type Input = {
  facts: MultiplicationFact[];
  count: number;
};

export function createArrayDotsExercise({ facts, count }: Input): ArrayItem[] {
  const usable = uniqueArrayItems(facts);
  if (usable.length === 0) {
    return Array.from({ length: count }, () => ({ rows: 2, cols: 3 }));
  }
  return Array.from(
    { length: count },
    (_, index) => usable[index % usable.length] ?? { rows: 2, cols: 3 },
  );
}
