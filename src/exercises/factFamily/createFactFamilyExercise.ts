import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import type { Stage } from "../../facts/Stage";
import { pickFrom } from "../../rng/pickFrom";
import { blankFactFamilyLine } from "./blankFactFamilyLine";
import type { FactFamilyCard } from "./FactFamilyCard";

type Input = {
  facts: MultiplicationFact[];
  count: number;
  stage: Stage;
  next: () => number;
};

export function createFactFamilyExercise({
  facts,
  count,
  stage,
  next,
}: Input): FactFamilyCard[] {
  const usable = facts.filter((fact) => fact.a !== 0 && fact.b !== 0);
  return Array.from({ length: count }, () => {
    const fact = pickFrom(usable, next) ?? { a: 2, b: 3, product: 6 };
    return {
      a: fact.a,
      b: fact.b,
      product: fact.product,
      lines: linesForStage(fact.a, fact.b, fact.product, stage, next),
    };
  });
}

function linesForStage(
  a: number,
  b: number,
  product: number,
  stage: Stage,
  next: () => number,
) {
  const multiply = [
    blankFactFamilyLine(a, b, product, "×", next),
    blankFactFamilyLine(b, a, product, "×", next),
  ];
  const divide = [
    blankFactFamilyLine(product, a, b, "÷", next),
    blankFactFamilyLine(product, b, a, "÷", next),
  ];
  if (stage === "multiply") {
    return multiply;
  }
  if (stage === "divide") {
    return divide;
  }
  return [...multiply, ...divide];
}
