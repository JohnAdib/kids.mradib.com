import type { Stage } from "../facts/Stage";

const stageCodes: Record<Stage, string> = {
  multiply: "m",
  divide: "d",
  mixed: "mix",
};

export function formatPackMachineId(
  focus: number,
  stage: Stage,
  sequence: number,
  seed: string,
) {
  return `${focus}-${stageCodes[stage]}-${sequence}-${seed}`;
}
