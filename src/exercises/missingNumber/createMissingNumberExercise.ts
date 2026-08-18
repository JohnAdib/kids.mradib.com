import type { DivisionFact } from "../../facts/DivisionFact";
import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import type { Stage } from "../../facts/Stage";
import type { MissingNumberItem } from "./MissingNumberItem";

type Input = {
  multiply: MultiplicationFact[];
  divide: DivisionFact[];
  stage: Stage;
  count: number;
  next: () => number;
};

export function createMissingNumberExercise({
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
      const blank = pickBlank(next, stage === "divide" ? "result" : undefined);
      items.push({
        left: fact.dividend,
        right: fact.divisor,
        result: fact.quotient,
        symbol: "÷",
        blank,
        answer: valueFor(blank, fact.dividend, fact.divisor, fact.quotient),
      });
      continue;
    }
    const fact = multiply[i % multiply.length];
    if (!fact) {
      continue;
    }
    const blank = pickBlank(next, stage === "multiply" ? "result" : undefined);
    items.push({
      left: fact.a,
      right: fact.b,
      result: fact.product,
      symbol: "×",
      blank,
      answer: valueFor(blank, fact.a, fact.b, fact.product),
    });
  }
  return items;
}

function pickBlank(next: () => number, forced?: MissingNumberItem["blank"]) {
  if (forced && next() < 0.7) {
    return forced;
  }
  const slots: MissingNumberItem["blank"][] = ["left", "right", "result"];
  return slots[Math.floor(next() * slots.length)] ?? "result";
}

function valueFor(
  blank: MissingNumberItem["blank"],
  left: number,
  right: number,
  result: number,
) {
  if (blank === "left") {
    return left;
  }
  if (blank === "right") {
    return right;
  }
  return result;
}
