import { expect, test } from "vitest";
import { pickDivisionFacts } from "../../facts/pickDivisionFacts";
import { pickMultiplicationFacts } from "../../facts/pickMultiplicationFacts";
import { createSeededRandom } from "../../rng/createSeededRandom";
import { createMatchLinesExercise } from "./createMatchLinesExercise";

test("each fact and each answer is used once", () => {
  const next = createSeededRandom("match-2");
  const multiply = pickMultiplicationFacts({
    tables: [2],
    count: 40,
    next,
  });
  const divide = pickDivisionFacts(multiply, next);
  const pairs = createMatchLinesExercise({
    multiply,
    divide,
    stage: "mixed",
    count: 8,
    next,
  });
  expect(pairs).toHaveLength(8);
  expect(new Set(pairs.map((pair) => pair.left)).size).toBe(8);
  expect(new Set(pairs.map((pair) => pair.right)).size).toBe(8);
});

test("the two columns are shuffled copies of the same pairs", () => {
  const pairs = createMatchLinesExercise({
    multiply: [
      { a: 2, b: 3, product: 6 },
      { a: 2, b: 4, product: 8 },
      { a: 2, b: 5, product: 10 },
      { a: 2, b: 6, product: 12 },
    ],
    divide: [],
    stage: "multiply",
    count: 4,
    next: createSeededRandom("cols"),
  });
  const leftRows = pairs.map((pair) => pair.leftOffset).sort((a, b) => a - b);
  const rightRows = pairs.map((pair) => pair.rightOffset).sort((a, b) => a - b);
  expect(leftRows).toEqual([0, 1, 2, 3]);
  expect(rightRows).toEqual([0, 1, 2, 3]);
  expect(pairs.some((pair) => pair.leftOffset !== pair.rightOffset)).toBe(true);
});
