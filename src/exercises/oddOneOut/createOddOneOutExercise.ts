import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import { pickInteger } from "../../rng/pickInteger";
import type { OddOneOutItem } from "./OddOneOutItem";

type Input = {
  facts: MultiplicationFact[];
  count: number;
  next: () => number;
};

export function createOddOneOutExercise({
  facts,
  count,
  next,
}: Input): OddOneOutItem[] {
  return Array.from({ length: count }, (_, index) => {
    const first = facts[index % facts.length] ?? { a: 2, b: 3, product: 6 };
    const second = facts[(index + 1) % facts.length] ?? first;
    const oddIndex = pickInteger(next, 0, 2);
    const trueA = `${first.a} × ${first.b} = ${first.product}`;
    const trueB = `${second.a} × ${second.b} = ${second.product}`;
    const falseFact = `${first.a} × ${first.b} = ${first.product + pickInteger(next, 1, 5)}`;
    const options = [trueA, trueB, trueA];
    options[oddIndex] = falseFact;
    if (options[0] === options[1]) {
      options[1] = trueB;
    }
    return { options, oddIndex };
  });
}
