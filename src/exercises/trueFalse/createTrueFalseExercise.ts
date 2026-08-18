import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import { pickInteger } from "../../rng/pickInteger";
import type { TrueFalseItem } from "./TrueFalseItem";

type Input = {
  facts: MultiplicationFact[];
  count: number;
  next: () => number;
};

export function createTrueFalseExercise({
  facts,
  count,
  next,
}: Input): TrueFalseItem[] {
  return Array.from({ length: count }, (_, index) => {
    const fact = facts[index % facts.length] ?? { a: 2, b: 5, product: 10 };
    const correct = next() < 0.5;
    if (correct) {
      return {
        text: `${fact.a} × ${fact.b} = ${fact.product}`,
        correct: true,
      };
    }
    const wrong = fact.product + pickInteger(next, 1, 6);
    return {
      text: `${fact.a} × ${fact.b} = ${wrong}`,
      correct: false,
    };
  });
}
