import { shuffleCopy } from "../rng/shuffleCopy";
import { challengeFillsPage } from "./challengeFillsPage";
import type { PackChallengeId } from "./PackChallengeId";

export function packPageCombos(
  kinds: PackChallengeId[],
  pageCount: number,
  next: () => number,
) {
  if (kinds.length === 0 || pageCount <= 0) {
    return [] as PackChallengeId[][];
  }
  const canPair = kinds.filter((kind) => !challengeFillsPage(kind)).length >= 2;
  const bag: PackChallengeId[] = [];
  const take = () => {
    if (bag.length === 0) {
      bag.push(...shuffleCopy(kinds, next));
    }
    return bag.shift() as PackChallengeId;
  };
  const pages: PackChallengeId[][] = [];
  while (pages.length < pageCount) {
    const first = take();
    if (challengeFillsPage(first) || !canPair) {
      pages.push([first]);
      continue;
    }
    const skipped: PackChallengeId[] = [];
    let second: PackChallengeId | undefined;
    const limit = kinds.length * 2;
    for (let i = 0; i < limit; i += 1) {
      const candidate = take();
      if (!challengeFillsPage(candidate)) {
        second = candidate;
        break;
      }
      skipped.push(candidate);
    }
    bag.unshift(...skipped);
    pages.push(second ? [first, second] : [first]);
  }
  return pages;
}
