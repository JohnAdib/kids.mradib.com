import type { Stage } from "../facts/Stage";

const secondsPerItem: Record<Stage, number> = {
  multiply: 8,
  divide: 10,
  mixed: 11,
};

export function suggestSeconds(itemCount: number, stage: Stage) {
  const raw = itemCount * secondsPerItem[stage];
  return Math.max(30, Math.ceil(raw / 30) * 30);
}
