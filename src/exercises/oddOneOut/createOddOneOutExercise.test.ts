import { expect, test } from "vitest";
import { pickDivisionFacts } from "../../facts/pickDivisionFacts";
import { pickMultiplicationFacts } from "../../facts/pickMultiplicationFacts";
import { createSeededRandom } from "../../rng/createSeededRandom";
import { createOddOneOutExercise } from "./createOddOneOutExercise";

test("divide stage uses division facts", () => {
  const next = createSeededRandom("odd-divide");
  const multiply = pickMultiplicationFacts({
    tables: [3],
    count: 20,
    next,
  });
  const divide = pickDivisionFacts(multiply, next);
  const items = createOddOneOutExercise({
    multiply,
    divide,
    stage: "divide",
    count: 8,
    next,
  });
  expect(items).toHaveLength(8);
  expect(
    items.every((item) => item.options.every((option) => option.includes("÷"))),
  ).toBe(true);
  expect(
    items.every((item) =>
      item.options.every((option) => !option.includes("×")),
    ),
  ).toBe(true);
});

test("multiply stage stays on multiplication facts", () => {
  const next = createSeededRandom("odd-multiply");
  const multiply = pickMultiplicationFacts({
    tables: [3],
    count: 20,
    next,
  });
  const items = createOddOneOutExercise({
    multiply,
    divide: [],
    stage: "multiply",
    count: 4,
    next,
  });
  expect(
    items.every((item) => item.options.every((option) => option.includes("×"))),
  ).toBe(true);
});
