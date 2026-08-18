import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import type { FactFamilyCard } from "./FactFamilyCard";

type Input = {
  facts: MultiplicationFact[];
  count: number;
  next: () => number;
};

const hides: FactFamilyCard["hide"][] = ["a", "b", "product", "divA", "divB"];

export function createFactFamilyExercise({
  facts,
  count,
  next,
}: Input): FactFamilyCard[] {
  const usable = facts.filter((fact) => fact.a !== 0 && fact.b !== 0);
  return Array.from({ length: count }, (_, index) => {
    const fact = usable[index % usable.length] ?? { a: 2, b: 3, product: 6 };
    return {
      a: fact.a,
      b: fact.b,
      product: fact.product,
      hide: hides[Math.floor(next() * hides.length)] ?? "product",
    };
  });
}
