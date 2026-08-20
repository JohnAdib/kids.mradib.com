import { expect, test } from "vitest";
import { createSeededRandom } from "../rng/createSeededRandom";
import { pickMultiplicationFacts } from "./pickMultiplicationFacts";

test("a quiz of 1, 2 and 3 stays on those tables", () => {
  const facts = pickMultiplicationFacts({
    tables: [1, 2, 3],
    count: 40,
    next: createSeededRandom("one-two-three"),
  });
  const allowed = new Set([0, 1, 2, 3]);
  expect(
    facts.every((fact) => allowed.has(fact.a) || allowed.has(fact.b)),
  ).toBe(true);
  expect(facts.some((fact) => fact.a === 1 || fact.b === 1)).toBe(true);
  expect(facts.some((fact) => fact.a === 3 || fact.b === 3)).toBe(true);
  expect(facts.some((fact) => fact.a === 0 || fact.b === 0)).toBe(true);
});
