import { priorTables } from "../curriculum/priorTables";
import { shuffleCopy } from "../rng/shuffleCopy";
import { buildFactPool } from "./buildFactPool";
import { focusShare } from "./focusShare";
import type { MultiplicationFact } from "./MultiplicationFact";

type PickFactsInput = {
  focus: number;
  includePrior: boolean;
  count: number;
  next: () => number;
};

export function pickMultiplicationFacts({
  focus,
  includePrior,
  count,
  next,
}: PickFactsInput): MultiplicationFact[] {
  const focusFacts = shuffleCopy(buildFactPool([focus]), next);
  if (!includePrior) {
    return takeCycled(focusFacts, count);
  }
  const prior = priorTables(focus);
  if (prior.length === 0) {
    return takeCycled(focusFacts, count);
  }
  const priorFacts = shuffleCopy(buildFactPool(prior), next);
  const focusCount = Math.round(count * focusShare(focus));
  const priorCount = count - focusCount;
  return shuffleCopy(
    [
      ...takeCycled(focusFacts, focusCount),
      ...takeCycled(priorFacts, priorCount),
    ],
    next,
  );
}

function takeCycled<T>(items: T[], count: number) {
  if (items.length === 0 || count <= 0) {
    return [] as T[];
  }
  const taken: T[] = [];
  for (let i = 0; i < count; i += 1) {
    const item = items[i % items.length];
    if (item !== undefined) {
      taken.push(item);
    }
  }
  return taken;
}
