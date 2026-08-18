import type { Stage } from "../facts/Stage";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";

export type PackSearch = {
  tables: number[];
  stage: Stage;
  font: PrintFont;
  colour: PrintColour;
  includeAnswers: boolean;
  seed?: string;
  sequence?: number;
};
