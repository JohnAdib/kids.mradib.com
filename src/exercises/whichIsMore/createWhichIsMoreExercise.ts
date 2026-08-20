import type { DivisionFact } from "../../facts/DivisionFact";
import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import type { Stage } from "../../facts/Stage";
import { pickFrom } from "../../rng/pickFrom";
import type { CompareItem } from "./CompareItem";

type Input = {
  multiply: MultiplicationFact[];
  divide: DivisionFact[];
  stage: Stage;
  count: number;
  next: () => number;
};

export function createWhichIsMoreExercise({
  multiply,
  divide,
  stage,
  count,
  next,
}: Input): CompareItem[] {
  return Array.from({ length: count }, () => {
    const useDivide =
      stage === "divide" ||
      (stage === "mixed" && next() < 0.5 && divide.length > 0);
    if (useDivide && divide.length > 0) {
      return divideCompare(divide, next);
    }
    return multiplyCompare(multiply, next);
  });
}

function multiplyCompare(facts: MultiplicationFact[], next: () => number) {
  const left = pickFrom(facts, next) ?? { a: 2, b: 4, product: 8 };
  const right = pickFrom(facts, next) ?? { a: 3, b: 3, product: 9 };
  return {
    left: { a: left.a, b: left.b },
    right: { a: right.a, b: right.b },
    symbol: "×" as const,
    leftValue: left.product,
    rightValue: right.product,
  };
}

function divideCompare(facts: DivisionFact[], next: () => number) {
  const left = pickFrom(facts, next) ?? {
    dividend: 8,
    divisor: 2,
    quotient: 4,
  };
  const right = pickFrom(facts, next) ?? {
    dividend: 9,
    divisor: 3,
    quotient: 3,
  };
  return {
    left: { a: left.dividend, b: left.divisor },
    right: { a: right.dividend, b: right.divisor },
    symbol: "÷" as const,
    leftValue: left.quotient,
    rightValue: right.quotient,
  };
}
