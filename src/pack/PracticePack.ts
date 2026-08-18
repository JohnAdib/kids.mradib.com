import type { Stage } from "../facts/Stage";
import type { PackExercise } from "./PackExercise";

export type PracticePack = {
  label: string;
  machineId: string;
  seed: string;
  sequence: number;
  focus: number;
  stage: Stage;
  includePrior: boolean;
  suggestedSeconds: number;
  itemCount: number;
  pages: Array<{ exercises: PackExercise[] }>;
  answers: string[];
};
