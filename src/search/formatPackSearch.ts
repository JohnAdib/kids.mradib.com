import { defaultPageCount } from "../pack/defaultPageCount";
import { packChallengeIds } from "../pack/packChallengeIds";
import { sameIdSet } from "../pack/sameIdSet";
import { formatChallengesParam } from "./formatChallengesParam";
import { formatTablesParam } from "./formatTablesParam";
import type { PackSearch } from "./PackSearch";

export function formatPackSearch(request: PackSearch) {
  const params = new URLSearchParams();
  params.set("tables", formatTablesParam(request.tables));
  if (request.stage !== "multiply") {
    params.set("stage", request.stage);
  }
  if (request.pageCount !== defaultPageCount) {
    params.set("pages", String(request.pageCount));
  }
  if (!sameIdSet(request.challenges, packChallengeIds)) {
    params.set("do", formatChallengesParam(request.challenges));
  }
  if (request.font !== "clear") {
    params.set("font", request.font);
  }
  if (request.colour !== "ink") {
    params.set("colour", request.colour);
  }
  if (request.includeAnswers) {
    params.set("answers", "1");
  }
  if (request.seed) {
    params.set("seed", request.seed);
  }
  if (request.sequence !== undefined) {
    params.set("n", String(request.sequence));
  }
  return decodeURIComponent(params.toString());
}
