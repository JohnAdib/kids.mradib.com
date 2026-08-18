import type { DivisionFact } from "../../facts/DivisionFact";
import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import type { Stage } from "../../facts/Stage";
import { shuffleCopy } from "../../rng/shuffleCopy";
import type { MatchPair } from "./MatchPair";

type Input = {
  multiply: MultiplicationFact[];
  divide: DivisionFact[];
  stage: Stage;
  count: number;
  next: () => number;
};

export function createMatchLinesExercise({
  multiply,
  divide,
  stage,
  count,
  next,
}: Input): MatchPair[] {
  const pairs: MatchPair[] = [];
  for (let i = 0; i < count; i += 1) {
    const useDivide =
      stage === "divide" ||
      (stage === "mixed" && next() < 0.4 && divide.length > 0);
    if (useDivide && divide.length > 0) {
      const fact = divide[i % divide.length];
      if (!fact) {
        continue;
      }
      pairs.push({
        left: `${fact.dividend} ÷ ${fact.divisor}`,
        right: String(fact.quotient),
        leftOffset: 0,
        rightOffset: 0,
      });
      continue;
    }
    const fact = multiply[i % multiply.length];
    if (!fact) {
      continue;
    }
    pairs.push({
      left: `${fact.a} × ${fact.b}`,
      right: String(fact.product),
      leftOffset: 0,
      rightOffset: 0,
    });
  }
  const leftOrder = shuffleCopy(pairs, next);
  const rightOrder = shuffleCopy(pairs, next);
  return pairs.map((pair) => ({
    ...pair,
    leftOffset: leftOrder.indexOf(pair),
    rightOffset: rightOrder.indexOf(pair),
  }));
}
