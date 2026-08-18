import type { Stage } from "../facts/Stage";

const stageMarks: Record<Stage, string> = {
  multiply: "M",
  divide: "D",
  mixed: "Mix",
};

export function formatPackLabel(focus: number, stage: Stage, sequence: number) {
  return `${focus}× ${stageMarks[stage]} #${sequence}`;
}
