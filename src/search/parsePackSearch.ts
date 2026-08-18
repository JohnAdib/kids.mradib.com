import type { Stage } from "../facts/Stage";
import { packChallengeIds } from "../pack/packChallengeIds";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import type { PackSearch } from "./PackSearch";
import { parseChallengesParam } from "./parseChallengesParam";
import { parsePageCount } from "./parsePageCount";
import { parseTablesParam } from "./parseTablesParam";
import { readAllowed } from "./readAllowed";
import { readPositiveInteger } from "./readPositiveInteger";

const stages: Stage[] = ["multiply", "divide", "mixed"];
const fonts: PrintFont[] = ["clear", "handwriting", "mono"];
const colours: PrintColour[] = ["ink", "colour"];

export function parsePackSearch(search: string): PackSearch | null {
  const params = new URLSearchParams(search);
  const rawTables = params.get("tables");
  if (!rawTables) {
    return null;
  }
  const tables = parseTablesParam(rawTables).filter((table) => table >= 1);
  if (tables.length === 0) {
    return null;
  }
  return {
    tables,
    stage: readAllowed(params.get("stage"), stages, "multiply"),
    font: readAllowed(params.get("font"), fonts, "clear"),
    colour: readAllowed(params.get("colour"), colours, "ink"),
    includeAnswers: params.get("answers") === "1",
    pageCount: parsePageCount(params.get("pages")),
    challenges: [
      ...(parseChallengesParam(params.get("do")) ?? packChallengeIds),
    ],
    seed: params.get("seed") || undefined,
    sequence: readPositiveInteger(params.get("n")),
  };
}
