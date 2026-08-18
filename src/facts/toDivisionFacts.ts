import type { DivisionFact } from "./DivisionFact";
import type { MultiplicationFact } from "./MultiplicationFact";

export function toDivisionFacts(fact: MultiplicationFact): DivisionFact[] {
  const facts: DivisionFact[] = [];
  if (fact.a !== 0) {
    facts.push({
      dividend: fact.product,
      divisor: fact.a,
      quotient: fact.b,
    });
  }
  if (fact.b !== 0 && fact.b !== fact.a) {
    facts.push({
      dividend: fact.product,
      divisor: fact.b,
      quotient: fact.a,
    });
  }
  return facts;
}
