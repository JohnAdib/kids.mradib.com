import type { MultiplicationFact } from "./MultiplicationFact";

export function factsForTable(table: number): MultiplicationFact[] {
  const facts: MultiplicationFact[] = [];
  for (let other = 0; other <= 12; other += 1) {
    facts.push({ a: table, b: other, product: table * other });
    if (other !== table) {
      facts.push({ a: other, b: table, product: other * table });
    }
  }
  return facts;
}
