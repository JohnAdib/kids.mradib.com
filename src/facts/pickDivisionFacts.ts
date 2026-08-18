import { shuffleCopy } from "../rng/shuffleCopy";
import type { DivisionFact } from "./DivisionFact";
import type { MultiplicationFact } from "./MultiplicationFact";
import { toDivisionFacts } from "./toDivisionFacts";

export function pickDivisionFacts(
  multiplicationFacts: MultiplicationFact[],
  next: () => number,
) {
  const divisionFacts: DivisionFact[] = [];
  for (const fact of multiplicationFacts) {
    divisionFacts.push(...toDivisionFacts(fact));
  }
  return shuffleCopy(
    divisionFacts.filter((fact) => fact.divisor !== 0),
    next,
  );
}
