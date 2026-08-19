import type { MultiplicationFact } from "../../facts/MultiplicationFact";

export function arrayFitsOnCard(fact: MultiplicationFact) {
  return (
    fact.a >= 1 &&
    fact.b >= 1 &&
    fact.a * fact.b <= 36 &&
    Math.max(fact.a, fact.b) <= 12
  );
}
