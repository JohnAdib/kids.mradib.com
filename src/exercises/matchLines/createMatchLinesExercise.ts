import type { DivisionFact } from "../../facts/DivisionFact";
import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import type { Stage } from "../../facts/Stage";
import { takeDistinctBy } from "../../numbers/takeDistinctBy";
import { shuffleCopy } from "../../rng/shuffleCopy";
import type { MatchPair } from "./MatchPair";
import { matchPairCandidates } from "./matchPairCandidates";

type Input = {
  multiply: MultiplicationFact[];
  divide: DivisionFact[];
  stage: Stage;
  count: number;
  next: () => number;
};

export function createMatchLinesExercise({
  multiply,
  divide,
  stage,
  count,
  next,
}: Input): MatchPair[] {
  const candidates = shuffleCopy(
    matchPairCandidates({ multiply, divide, stage }),
    next,
  );
  const distinct = takeDistinctBy(
    candidates,
    (pair) => [`left:${pair.left}`, `right:${pair.right}`],
    count,
  );
  const leftOrder = shuffleCopy(distinct, next);
  const rightOrder = shuffleCopy(distinct, next);
  return distinct.map((pair) => ({
    left: pair.left,
    right: pair.right,
    leftOffset: leftOrder.indexOf(pair),
    rightOffset: rightOrder.indexOf(pair),
  }));
}
