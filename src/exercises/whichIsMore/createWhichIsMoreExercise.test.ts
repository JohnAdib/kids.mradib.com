import { expect, test } from "vitest";
import { pickDivisionFacts } from "../../facts/pickDivisionFacts";
import { pickMultiplicationFacts } from "../../facts/pickMultiplicationFacts";
import { createSeededRandom } from "../../rng/createSeededRandom";
import { createWhichIsMoreExercise } from "./createWhichIsMoreExercise";

test("divide stage compares division facts", () => {
  const next = createSeededRandom("which-divide");
  const multiply = pickMultiplicationFacts({
    tables: [3],
    count: 24,
    next,
  });
  const divide = pickDivisionFacts(multiply, next);
  const items = createWhichIsMoreExercise({
    multiply,
    divide,
    stage: "divide",
    count: 10,
    next,
  });
  expect(items).toHaveLength(10);
  expect(items.every((item) => item.symbol === "÷")).toBe(true);
});

test("multiply stage compares multiplication facts", () => {
  const next = createSeededRandom("which-multiply");
  const multiply = pickMultiplicationFacts({
    tables: [3],
    count: 24,
    next,
  });
  const items = createWhichIsMoreExercise({
    multiply,
    divide: [],
    stage: "multiply",
    count: 6,
    next,
  });
  expect(items.every((item) => item.symbol === "×")).toBe(true);
});
