import type { DivisionFact } from "../../facts/DivisionFact";
import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import type { Stage } from "../../facts/Stage";
import { toDivisionFacts } from "../../facts/toDivisionFacts";
import { pickFrom } from "../../rng/pickFrom";
import { pickInteger } from "../../rng/pickInteger";
import type { OddOneOutItem } from "./OddOneOutItem";

type Input = {
  multiply: MultiplicationFact[];
  divide: DivisionFact[];
  stage: Stage;
  count: number;
  next: () => number;
};

export function createOddOneOutExercise({
  multiply,
  divide,
  stage,
  count,
  next,
}: Input): OddOneOutItem[] {
  const dividePool =
    divide.length > 0
      ? divide
      : multiply
          .flatMap((fact) => toDivisionFacts(fact))
          .filter((fact) => fact.divisor !== 0);
  return Array.from({ length: count }, () => {
    if (stage === "divide") {
      return divideItem(dividePool, next);
    }
    if (stage === "mixed" && dividePool.length > 0 && next() < 0.5) {
      return divideItem(dividePool, next);
    }
    return multiplyItem(multiply, next);
  });
}

function multiplyItem(facts: MultiplicationFact[], next: () => number) {
  const first = pickFrom(facts, next) ?? { a: 2, b: 3, product: 6 };
  const second = pickFrom(facts, next) ?? first;
  const oddIndex = pickInteger(next, 0, 2);
  const trueA = `${first.a} × ${first.b} = ${first.product}`;
  const trueB = `${second.a} × ${second.b} = ${second.product}`;
  const falseFact = `${first.a} × ${first.b} = ${first.product + pickInteger(next, 1, 5)}`;
  return buildItem(trueA, trueB, falseFact, oddIndex);
}

function divideItem(facts: DivisionFact[], next: () => number) {
  const first = pickFrom(facts, next) ?? {
    dividend: 6,
    divisor: 2,
    quotient: 3,
  };
  const second = pickFrom(facts, next) ?? first;
  const oddIndex = pickInteger(next, 0, 2);
  const trueA = `${first.dividend} ÷ ${first.divisor} = ${first.quotient}`;
  const trueB = `${second.dividend} ÷ ${second.divisor} = ${second.quotient}`;
  const falseFact = `${first.dividend} ÷ ${first.divisor} = ${first.quotient + pickInteger(next, 1, 5)}`;
  return buildItem(trueA, trueB, falseFact, oddIndex);
}

function buildItem(
  trueA: string,
  trueB: string,
  falseFact: string,
  oddIndex: number,
): OddOneOutItem {
  const options = [trueA, trueB, trueA];
  options[oddIndex] = falseFact;
  if (options[0] === options[1]) {
    options[1] = trueB;
  }
  return { options, oddIndex };
}
