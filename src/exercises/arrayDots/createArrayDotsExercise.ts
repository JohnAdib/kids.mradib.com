import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import type { Stage } from "../../facts/Stage";
import type { ArrayItem } from "./ArrayItem";
import { uniqueArrayItems } from "./uniqueArrayItems";

type Input = {
  facts: MultiplicationFact[];
  count: number;
  stage: Stage;
  next: () => number;
};

export function createArrayDotsExercise({
  facts,
  count,
  stage,
  next,
}: Input): ArrayItem[] {
  const usable = uniqueArrayItems(facts);
  const fallback: ArrayItem = {
    rows: 2,
    cols: 3,
    stage: "multiply",
    divideBy: "rows",
  };
  if (usable.length === 0) {
    return Array.from({ length: count }, () => ({ ...fallback }));
  }
  return Array.from({ length: count }, (_, index) => {
    const base = usable[index % usable.length] ?? fallback;
    const useDivide = stage === "divide" || (stage === "mixed" && next() < 0.5);
    return {
      rows: base.rows,
      cols: base.cols,
      stage: useDivide ? "divide" : "multiply",
      divideBy: next() < 0.5 ? "rows" : "cols",
    };
  });
}
