import type { ChartColouring } from "../charts/ChartColouring";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";

export type ChartSearch = {
  lastFactor: number;
  includeZero: boolean;
  colouring: ChartColouring;
  font: PrintFont;
  colour: PrintColour;
  seed?: string;
  sequence?: number;
};
