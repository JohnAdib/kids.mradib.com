import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import type { ArrayItem } from "./ArrayItem";

export function arrayItemFromFact(fact: MultiplicationFact): ArrayItem {
  if (fact.a <= fact.b) {
    return { rows: fact.a, cols: fact.b, stage: "multiply", divideBy: "rows" };
  }
  return { rows: fact.b, cols: fact.a, stage: "multiply", divideBy: "rows" };
}
