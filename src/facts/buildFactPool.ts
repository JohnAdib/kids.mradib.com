import { factsForTable } from "./factsForTable";
import type { MultiplicationFact } from "./MultiplicationFact";

export function buildFactPool(tables: number[]) {
  const seen = new Set<string>();
  const pool: MultiplicationFact[] = [];
  for (const table of tables) {
    for (const fact of factsForTable(table)) {
      const key = `${fact.a}x${fact.b}`;
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      pool.push(fact);
    }
  }
  return pool;
}
