import type { MultiplicationFact } from "./MultiplicationFact";
import { timesTableFactors } from "./timesTableFactors";

export function factsForTable(table: number): MultiplicationFact[] {
  const facts: MultiplicationFact[] = [];
  for (const other of timesTableFactors) {
    facts.push({ a: table, b: other, product: table * other });
    if (other !== table) {
      facts.push({ a: other, b: table, product: other * table });
    }
  }
  return facts;
}
