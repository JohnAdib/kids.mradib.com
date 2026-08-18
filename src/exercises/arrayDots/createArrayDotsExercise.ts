import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import type { ArrayItem } from "./ArrayItem";

type Input = {
  facts: MultiplicationFact[];
  count: number;
};

export function createArrayDotsExercise({ facts, count }: Input): ArrayItem[] {
  const usable = facts.filter(
    (fact) => fact.a >= 1 && fact.a <= 6 && fact.b >= 1 && fact.b <= 6,
  );
  if (usable.length === 0) {
    return Array.from({ length: count }, () => ({ rows: 2, cols: 3 }));
  }
  return Array.from({ length: count }, (_, index) => {
    const fact = usable[index % usable.length] ?? { a: 2, b: 3, product: 6 };
    return { rows: fact.a, cols: fact.b };
  });
}
