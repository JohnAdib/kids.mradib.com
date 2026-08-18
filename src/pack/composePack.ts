import { priorTables } from "../curriculum/priorTables";
import { createArrayDotsExercise } from "../exercises/arrayDots/createArrayDotsExercise";
import { createColourMultiplesExercise } from "../exercises/colourMultiples/createColourMultiplesExercise";
import { createFactFamilyExercise } from "../exercises/factFamily/createFactFamilyExercise";
import { createMatchLinesExercise } from "../exercises/matchLines/createMatchLinesExercise";
import { createMissingNumberExercise } from "../exercises/missingNumber/createMissingNumberExercise";
import { createMultiplesPathExercise } from "../exercises/multiplesPath/createMultiplesPathExercise";
import { createOddOneOutExercise } from "../exercises/oddOneOut/createOddOneOutExercise";
import { createPartialSquareExercise } from "../exercises/partialSquare/createPartialSquareExercise";
import { createSkipCountExercise } from "../exercises/skipCount/createSkipCountExercise";
import { createTrueFalseExercise } from "../exercises/trueFalse/createTrueFalseExercise";
import { createWheelExercise } from "../exercises/wheel/createWheelExercise";
import { createWhichIsMoreExercise } from "../exercises/whichIsMore/createWhichIsMoreExercise";
import { pickDivisionFacts } from "../facts/pickDivisionFacts";
import { pickMultiplicationFacts } from "../facts/pickMultiplicationFacts";
import type { Stage } from "../facts/Stage";
import { createSeededRandom } from "../rng/createSeededRandom";
import { collectAnswers } from "./collectAnswers";
import { countMarkableItems } from "./countMarkableItems";
import { formatPackLabel } from "./formatPackLabel";
import { formatPackMachineId } from "./formatPackMachineId";
import type { PackExercise } from "./PackExercise";
import type { PracticePack } from "./PracticePack";
import { suggestSeconds } from "./suggestSeconds";

type Input = {
  focus: number;
  stage: Stage;
  includePrior: boolean;
  seed: string;
  sequence: number;
};

export function composePack(input: Input): PracticePack {
  const next = createSeededRandom(input.seed);
  const multiply = pickMultiplicationFacts({
    focus: input.focus,
    includePrior: input.includePrior,
    count: 90,
    next,
  });
  const divide = pickDivisionFacts(multiply, next);
  const reviewTables = input.includePrior
    ? [input.focus, ...priorTables(input.focus)]
    : [input.focus];
  const pages = layouts(input.stage).map((kinds) => ({
    exercises: kinds.map((kind) =>
      buildExercise(kind, {
        focus: input.focus,
        stage: input.stage,
        multiply,
        divide,
        reviewTables,
        next,
      }),
    ),
  }));
  const exercises = pages.flatMap((page) => page.exercises);
  const itemCount = countMarkableItems(exercises);
  return {
    label: formatPackLabel(input.focus, input.stage, input.sequence),
    machineId: formatPackMachineId(
      input.focus,
      input.stage,
      input.sequence,
      input.seed,
    ),
    seed: input.seed,
    sequence: input.sequence,
    focus: input.focus,
    stage: input.stage,
    includePrior: input.includePrior,
    suggestedSeconds: suggestSeconds(itemCount, input.stage),
    itemCount,
    pages,
    answers: collectAnswers(exercises),
  };
}

type Kind = PackExercise["type"];

function layouts(stage: Stage): Kind[][] {
  if (stage === "divide") {
    return [
      ["wheel", "missingNumber"],
      ["matchLines", "trueFalse"],
      ["factFamily", "missingNumber"],
      ["oddOneOut", "whichIsMore"],
    ];
  }
  if (stage === "mixed") {
    return [
      ["wheel", "missingNumber"],
      ["matchLines", "colourMultiples"],
      ["skipCount", "partialSquare"],
      ["factFamily", "trueFalse", "multiplesPath"],
    ];
  }
  return [
    ["wheel", "missingNumber"],
    ["matchLines", "colourMultiples"],
    ["skipCount", "arrayDots", "missingNumber"],
    ["factFamily", "trueFalse", "whichIsMore"],
  ];
}

function buildExercise(
  kind: Kind,
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
    case "missingNumber":
      return {
        type: "missingNumber",
        items: createMissingNumberExercise({
          multiply: ctx.multiply,
          divide: ctx.divide,
          stage: ctx.stage,
          count: 9,
          next: ctx.next,
        }),
      };
    case "wheel":
      return {
        type: "wheel",
        wheels: createWheelExercise({
          focus: ctx.focus,
          stage: ctx.stage,
          count: 2,
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
          count: 8,
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
          count: 4,
          next: ctx.next,
        }),
      };
    case "trueFalse":
      return {
        type: "trueFalse",
        items: createTrueFalseExercise({
          facts: ctx.multiply,
          count: 6,
          next: ctx.next,
        }),
      };
    case "skipCount":
      return {
        type: "skipCount",
        items: createSkipCountExercise({
          tables: ctx.reviewTables,
          count: 4,
          next: ctx.next,
        }),
      };
    case "arrayDots":
      return {
        type: "arrayDots",
        items: createArrayDotsExercise({ facts: ctx.multiply, count: 4 }),
      };
    case "partialSquare":
      return {
        type: "partialSquare",
        square: createPartialSquareExercise({
          tables: ctx.reviewTables,
          next: ctx.next,
        }),
      };
    case "oddOneOut":
      return {
        type: "oddOneOut",
        items: createOddOneOutExercise({
          facts: ctx.multiply,
          count: 4,
          next: ctx.next,
        }),
      };
    case "whichIsMore":
      return {
        type: "whichIsMore",
        items: createWhichIsMoreExercise({ facts: ctx.multiply, count: 6 }),
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
