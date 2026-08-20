import { createArrayDotsExercise } from "../exercises/arrayDots/createArrayDotsExercise";
import { createColourMultiplesExercise } from "../exercises/colourMultiples/createColourMultiplesExercise";
import { createFactFamilyExercise } from "../exercises/factFamily/createFactFamilyExercise";
import { createMatchLinesExercise } from "../exercises/matchLines/createMatchLinesExercise";
import { createMissingNumberExercise } from "../exercises/missingNumber/createMissingNumberExercise";
import { createMultiplesPathExercise } from "../exercises/multiplesPath/createMultiplesPathExercise";
import { createOddOneOutExercise } from "../exercises/oddOneOut/createOddOneOutExercise";
import { createPartialSquareExercise } from "../exercises/partialSquare/createPartialSquareExercise";
import { createSkipCountExercise } from "../exercises/skipCount/createSkipCountExercise";
import { createTimesFactsExercise } from "../exercises/timesFacts/createTimesFactsExercise";
import { createTrueFalseExercise } from "../exercises/trueFalse/createTrueFalseExercise";
import { createWheelExercise } from "../exercises/wheel/createWheelExercise";
import { createWhichIsMoreExercise } from "../exercises/whichIsMore/createWhichIsMoreExercise";
import { pickDivisionFacts } from "../facts/pickDivisionFacts";
import { pickMultiplicationFacts } from "../facts/pickMultiplicationFacts";
import type { Stage } from "../facts/Stage";
import { sortedUniqueNumbers } from "../numbers/sortedUniqueNumbers";
import { createSeededRandom } from "../rng/createSeededRandom";
import { collectAnswers } from "./collectAnswers";
import { countMarkableItems } from "./countMarkableItems";
import { defaultPackChallengeIds } from "./defaultPackChallengeIds";
import { defaultPageCount } from "./defaultPageCount";
import { formatPackLabel } from "./formatPackLabel";
import { formatPackMachineId } from "./formatPackMachineId";
import type { PackChallengeId } from "./PackChallengeId";
import type { PackExercise } from "./PackExercise";
import type { PracticePack } from "./PracticePack";
import { packPageCombos } from "./packPageCombos";
import { packPageItemCounts } from "./packPageItemCounts";
import { suggestSeconds } from "./suggestSeconds";

type Input = {
  tables: number[];
  stage: Stage;
  seed: string;
  sequence: number;
  pageCount?: number;
  challenges?: PackChallengeId[];
};

export function composePack(input: Input): PracticePack {
  const tables = sortedUniqueNumbers(input.tables);
  const chosen = tables.length > 0 ? tables : [2];
  const focus = chosen.reduce((max, table) => Math.max(max, table), 1);
  const pageCount = input.pageCount ?? defaultPageCount;
  const challenges = [...(input.challenges ?? defaultPackChallengeIds)];
  const next = createSeededRandom(input.seed);
  const multiply = pickMultiplicationFacts({
    tables: chosen,
    count: Math.max(40, pageCount * 36),
    next,
  });
  const divide = pickDivisionFacts(multiply, next);
  const pages = packPageCombos(challenges, pageCount, next).map((kinds) => {
    const itemCounts = packPageItemCounts(kinds);
    return {
      exercises: kinds.map((kind, index) =>
        buildExercise(kind, itemCounts[index] ?? 0, {
          focus,
          stage: input.stage,
          multiply,
          divide,
          reviewTables: chosen,
          next,
        }),
      ),
    };
  });
  const exercises = pages.flatMap((page) => page.exercises);
  const itemCount = countMarkableItems(exercises);
  return {
    label: formatPackLabel(chosen, input.stage, input.sequence),
    machineId: formatPackMachineId(
      chosen,
      input.stage,
      input.sequence,
      input.seed,
    ),
    seed: input.seed,
    sequence: input.sequence,
    tables: chosen,
    focus,
    stage: input.stage,
    includePrior: chosen.length > 1,
    suggestedSeconds: suggestSeconds(itemCount, input.stage),
    itemCount,
    pageCount: pages.length,
    challenges,
    pages,
    answers: collectAnswers(exercises),
  };
}

function buildExercise(
  kind: PackExercise["type"],
  count: number,
  ctx: {
    focus: number;
    stage: Stage;
    multiply: ReturnType<typeof pickMultiplicationFacts>;
    divide: ReturnType<typeof pickDivisionFacts>;
    reviewTables: number[];
    next: () => number;
  },
): PackExercise {
  switch (kind) {
    case "timesFacts":
      return {
        type: "timesFacts",
        items: createTimesFactsExercise({
          multiply: ctx.multiply,
          divide: ctx.divide,
          stage: ctx.stage,
          count: count,
          next: ctx.next,
        }),
      };
    case "missingNumber":
      return {
        type: "missingNumber",
        items: createMissingNumberExercise({
          multiply: ctx.multiply,
          divide: ctx.divide,
          stage: ctx.stage,
          count: count,
          next: ctx.next,
        }),
      };
    case "wheel":
      return {
        type: "wheel",
        wheels: createWheelExercise({
          focus: ctx.focus,
          stage: ctx.stage,
          count: count,
          next: ctx.next,
        }),
      };
    case "matchLines":
      return {
        type: "matchLines",
        pairs: createMatchLinesExercise({
          multiply: ctx.multiply,
          divide: ctx.divide,
          stage: ctx.stage,
          count: count,
          next: ctx.next,
        }),
      };
    case "colourMultiples":
      return {
        type: "colourMultiples",
        grid: createColourMultiplesExercise({
          focus: ctx.focus,
          next: ctx.next,
        }),
      };
    case "factFamily":
      return {
        type: "factFamily",
        cards: createFactFamilyExercise({
          facts: ctx.multiply,
          count: count,
          next: ctx.next,
        }),
      };
    case "trueFalse":
      return {
        type: "trueFalse",
        items: createTrueFalseExercise({
          facts: ctx.multiply,
          count: count || 12,
          next: ctx.next,
        }),
      };
    case "skipCount":
      return {
        type: "skipCount",
        items: createSkipCountExercise({
          tables: ctx.reviewTables,
          count: count,
          next: ctx.next,
        }),
      };
    case "arrayDots":
      return {
        type: "arrayDots",
        items: createArrayDotsExercise({
          facts: ctx.multiply,
          count: count,
          stage: ctx.stage,
          next: ctx.next,
        }),
      };
    case "partialSquare":
      return {
        type: "partialSquare",
        square: createPartialSquareExercise({
          tables: ctx.reviewTables,
        }),
      };
    case "oddOneOut":
      return {
        type: "oddOneOut",
        items: createOddOneOutExercise({
          multiply: ctx.multiply,
          divide: ctx.divide,
          stage: ctx.stage,
          count: count,
          next: ctx.next,
        }),
      };
    case "whichIsMore":
      return {
        type: "whichIsMore",
        items: createWhichIsMoreExercise({
          multiply: ctx.multiply,
          divide: ctx.divide,
          stage: ctx.stage,
          count: count,
          next: ctx.next,
        }),
      };
    case "multiplesPath":
      return {
        type: "multiplesPath",
        focus: ctx.focus,
        cells: createMultiplesPathExercise({
          focus: ctx.focus,
          next: ctx.next,
        }),
      };
  }
}
