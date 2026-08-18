import type { ChartColouring } from "../charts/ChartColouring";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import type { ChartSearch } from "./ChartSearch";
import { readAllowed } from "./readAllowed";
import { readPositiveInteger } from "./readPositiveInteger";

const colourings: ChartColouring[] = ["none", "squares", "shells", "diagonals"];
const fonts: PrintFont[] = ["clear", "handwriting", "mono"];
const colours: PrintColour[] = ["ink", "colour"];

export function parseChartSearch(search: string): ChartSearch | null {
  const params = new URLSearchParams(search);
  const hasRequest =
    params.has("to") ||
    params.has("colouring") ||
    params.has("seed") ||
    params.has("zero");
  if (!hasRequest) {
    return null;
  }
  const lastFactor = readPositiveInteger(params.get("to")) ?? 12;
  return {
    lastFactor: lastFactor === 10 ? 10 : 12,
    includeZero: params.get("zero") === "1",
    colouring: readAllowed(params.get("colouring"), colourings, "squares"),
    font: readAllowed(params.get("font"), fonts, "clear"),
    colour: readAllowed(params.get("colour"), colours, "ink"),
    seed: params.get("seed") || undefined,
    sequence: readPositiveInteger(params.get("n")),
  };
}
