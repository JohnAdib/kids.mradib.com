import type { Stage } from "../facts/Stage";
import { formatTableSet } from "./formatTableSet";

const stageMarks: Record<Stage, string> = {
  multiply: "M",
  divide: "D",
  mixed: "Mix",
};

export function formatPackLabel(
  tables: number[],
  stage: Stage,
  sequence: number,
) {
  return `${formatTableSet(tables)}× ${stageMarks[stage]} #${sequence}`;
}
