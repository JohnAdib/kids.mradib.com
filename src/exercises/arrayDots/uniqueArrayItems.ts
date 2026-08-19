import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import type { ArrayItem } from "./ArrayItem";
import { arrayFitsOnCard } from "./arrayFitsOnCard";
import { arrayItemFromFact } from "./arrayItemFromFact";

export function uniqueArrayItems(facts: MultiplicationFact[]): ArrayItem[] {
  const seen = new Set<string>();
  const items: ArrayItem[] = [];
  for (const fact of facts) {
    if (!arrayFitsOnCard(fact)) {
      continue;
    }
    const item = arrayItemFromFact(fact);
    const key = `${item.rows}x${item.cols}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    items.push(item);
  }
  return items;
}
