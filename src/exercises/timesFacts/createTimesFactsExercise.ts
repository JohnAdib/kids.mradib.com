import type { DivisionFact } from "../../facts/DivisionFact";
import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import type { Stage } from "../../facts/Stage";
import type { MissingNumberItem } from "../missingNumber/MissingNumberItem";

type Input = {
  multiply: MultiplicationFact[];
  divide: DivisionFact[];
  stage: Stage;
  count: number;
  next: () => number;
};

export function createTimesFactsExercise({
  multiply,
  divide,
  stage,
  count,
  next,
}: Input): MissingNumberItem[] {
  const items: MissingNumberItem[] = [];
  for (let i = 0; i < count; i += 1) {
    const useDivide =
      stage === "divide" ||
      (stage === "mixed" && next() < 0.5 && divide.length > 0);
    if (useDivide && divide.length > 0) {
      const fact = divide[i % divide.length];
      if (!fact) {
        continue;
      }
      items.push({
        left: fact.dividend,
        right: fact.divisor,
        result: fact.quotient,
        symbol: "÷",
        blank: "result",
        answer: fact.quotient,
      });
      continue;
    }
    const fact = multiply[i % multiply.length];
    if (!fact) {
      continue;
    }
    items.push({
      left: fact.a,
      right: fact.b,
      result: fact.product,
      symbol: "×",
      blank: "result",
      answer: fact.product,
    });
  }
  return items;
}
