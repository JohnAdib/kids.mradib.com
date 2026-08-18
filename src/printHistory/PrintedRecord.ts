import type { ChartColouring } from "../charts/ChartColouring";
import type { Stage } from "../facts/Stage";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";

export type PrintedRecord = {
  kind: "pack" | "chart";
  label: string;
  machineId: string;
  seed: string;
  sequence: number;
  focus?: number;
  tables: number[];
  stage?: Stage;
  includePrior: boolean;
  includeAnswers: boolean;
  includeInverses?: boolean;
  colouring?: ChartColouring;
  font: PrintFont;
  colour: PrintColour;
  printedAt: string;
};
