import { expect, test } from "vitest";
import { pickMultiplicationFacts } from "../../facts/pickMultiplicationFacts";
import { createSeededRandom } from "../../rng/createSeededRandom";
import { createFactFamilyExercise } from "./createFactFamilyExercise";

test("multiply stage only shows multiplication lines with a blank each", () => {
  const next = createSeededRandom("family-multiply");
  const facts = pickMultiplicationFacts({ tables: [3], count: 20, next });
  const cards = createFactFamilyExercise({
    facts,
    count: 4,
    stage: "multiply",
    next,
  });
  expect(cards).toHaveLength(4);
  for (const card of cards) {
    expect(card.lines).toHaveLength(2);
    expect(card.lines.every((line) => line.symbol === "×")).toBe(true);
    for (const line of card.lines) {
      const blanks = [line.left, line.right, line.result].filter(
        (value) => value === null,
      );
      expect(blanks).toHaveLength(1);
    }
  }
});

test("divide stage only shows division lines with a blank each", () => {
  const next = createSeededRandom("family-divide");
  const facts = pickMultiplicationFacts({ tables: [3], count: 20, next });
  const cards = createFactFamilyExercise({
    facts,
    count: 3,
    stage: "divide",
    next,
  });
  for (const card of cards) {
    expect(card.lines).toHaveLength(2);
    expect(card.lines.every((line) => line.symbol === "÷")).toBe(true);
    for (const line of card.lines) {
      const blanks = [line.left, line.right, line.result].filter(
        (value) => value === null,
      );
      expect(blanks).toHaveLength(1);
    }
  }
});

test("mixed stage shows multiply and divide lines", () => {
  const next = createSeededRandom("family-mixed");
  const facts = pickMultiplicationFacts({ tables: [3], count: 20, next });
  const cards = createFactFamilyExercise({
    facts,
    count: 2,
    stage: "mixed",
    next,
  });
  for (const card of cards) {
    expect(card.lines).toHaveLength(4);
    expect(card.lines.filter((line) => line.symbol === "×")).toHaveLength(2);
    expect(card.lines.filter((line) => line.symbol === "÷")).toHaveLength(2);
  }
});
