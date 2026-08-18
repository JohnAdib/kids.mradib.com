import type { Stage } from "../facts/Stage";
import type { PackChallengeId } from "./PackChallengeId";
import type { PackExercise } from "./PackExercise";

export type PracticePack = {
  label: string;
  machineId: string;
  seed: string;
  sequence: number;
  tables: number[];
  focus: number;
  stage: Stage;
  includePrior: boolean;
  suggestedSeconds: number;
  itemCount: number;
  pageCount: number;
  challenges: PackChallengeId[];
  pages: Array<{ exercises: PackExercise[] }>;
  answers: string[];
};
