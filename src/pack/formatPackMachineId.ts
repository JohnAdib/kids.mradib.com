import type { Stage } from "../facts/Stage";

const stageCodes: Record<Stage, string> = {
  multiply: "m",
  divide: "d",
  mixed: "mix",
};

export function formatPackMachineId(
  tables: number[],
  stage: Stage,
  sequence: number,
  seed: string,
) {
  const focus = tables.length > 0 ? tables.join("-") : "2";
  return `${focus}-${stageCodes[stage]}-${sequence}-${seed}`;
}
