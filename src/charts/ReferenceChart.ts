import type { ChartColouring } from "./ChartColouring";

export type ReferenceChart = {
  label: string;
  machineId: string;
  seed: string;
  sequence: number;
  tables: number[];
  colouring: ChartColouring;
};
