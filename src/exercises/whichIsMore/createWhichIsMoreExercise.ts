import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import type { CompareItem } from "./CompareItem";

type Input = {
  facts: MultiplicationFact[];
  count: number;
};

export function createWhichIsMoreExercise({
  facts,
  count,
}: Input): CompareItem[] {
  return Array.from({ length: count }, (_, index) => {
    const left = facts[index % facts.length] ?? { a: 2, b: 4, product: 8 };
    const right = facts[(index + 3) % facts.length] ?? {
      a: 3,
      b: 3,
      product: 9,
    };
    return {
      leftText: `${left.a} × ${left.b}`,
      rightText: `${right.a} × ${right.b}`,
      leftValue: left.product,
      rightValue: right.product,
    };
  });
}
