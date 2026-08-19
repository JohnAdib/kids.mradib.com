import { arrayDotsPageCount } from "../exercises/arrayDots/arrayDotsPageCount";
import { timesFactsBandSize } from "../exercises/timesFacts/timesFactsBandSize";
import { challengeFillsPage } from "./challengeFillsPage";
import type { PackChallengeId } from "./PackChallengeId";

const usableMm = 276;
const gapMm = 2;
const headingMm = 10;

type ItemLayout = {
  mmPerItem: number;
  columns: number;
};

const layouts: Partial<Record<PackChallengeId, ItemLayout>> = {
  whichIsMore: { mmPerItem: 2.8, columns: 3 },
  missingNumber: { mmPerItem: 3.8, columns: 3 },
  skipCount: { mmPerItem: 5, columns: 2 },
  oddOneOut: { mmPerItem: 10, columns: 1 },
  factFamily: { mmPerItem: 11.2, columns: 3 },
  matchLines: { mmPerItem: 10.3, columns: 1 },
  timesFacts: { mmPerItem: 3.1, columns: 20 },
  wheel: { mmPerItem: 42, columns: 3 },
  arrayDots: { mmPerItem: 28, columns: 3 },
};

export function packPageItemCounts(kinds: PackChallengeId[]) {
  if (kinds.length === 1 && challengeFillsPage(kinds[0])) {
    return [fillerCount(kinds[0])];
  }
  const total = usableMm - gapMm * (kinds.length - 1);
  const equal = total / kinds.length;
  const counts = kinds.map((kind) => itemsForBudget(kind, equal));
  const used = kinds.reduce(
    (sum, kind, index) => sum + sectionHeightMm(kind, counts[index] ?? 0),
    0,
  );
  const leftover = total - used;
  const growAt = densestIndex(kinds);
  const growKind = kinds[growAt];
  if (leftover >= 2 && growKind) {
    const grown = itemsForBudget(
      growKind,
      sectionHeightMm(growKind, counts[growAt] ?? 0) + leftover,
    );
    counts[growAt] = grown;
  }
  while (pageHeightMm(kinds, counts) > total) {
    const shrinkAt = densestIndex(kinds);
    const layout = layouts[kinds[shrinkAt]];
    const current = counts[shrinkAt] ?? 0;
    if (!layout || current <= layout.columns) {
      break;
    }
    counts[shrinkAt] = current - layout.columns;
  }
  return counts;
}

function fillerCount(kind: PackChallengeId) {
  if (kind === "timesFacts") {
    return timesFactsBandSize * 4;
  }
  if (kind === "wheel") {
    return 6;
  }
  if (kind === "arrayDots") {
    return arrayDotsPageCount;
  }
  return 0;
}

function itemsForBudget(kind: PackChallengeId, budgetMm: number) {
  const layout = layouts[kind];
  if (!layout) {
    return 0;
  }
  const raw = Math.floor((budgetMm - headingMm) / layout.mmPerItem);
  return Math.max(
    layout.columns,
    Math.floor(raw / layout.columns) * layout.columns,
  );
}

function sectionHeightMm(kind: PackChallengeId, count: number) {
  const layout = layouts[kind];
  if (!layout) {
    return 0;
  }
  return headingMm + count * layout.mmPerItem;
}

function pageHeightMm(kinds: PackChallengeId[], counts: number[]) {
  return kinds.reduce(
    (sum, kind, index) => sum + sectionHeightMm(kind, counts[index] ?? 0),
    0,
  );
}

function densestIndex(kinds: PackChallengeId[]) {
  return kinds.reduce((best, kind, index) => {
    const current = layouts[kind]?.mmPerItem ?? Number.POSITIVE_INFINITY;
    const winner = layouts[kinds[best]]?.mmPerItem ?? Number.POSITIVE_INFINITY;
    return current < winner ? index : best;
  }, 0);
}
