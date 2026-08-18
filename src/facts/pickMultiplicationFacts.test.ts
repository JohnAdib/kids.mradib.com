import { expect, test } from "vitest";
import { createSeededRandom } from "../rng/createSeededRandom";
import { pickMultiplicationFacts } from "./pickMultiplicationFacts";

test("a 7 pack is about half 7 and half earlier tables", () => {
  const facts = pickMultiplicationFacts({
    focus: 7,
    includePrior: true,
    count: 100,
    next: createSeededRandom("seven"),
  });
  const focusCount = facts.filter(
    (fact) => fact.a === 7 || fact.b === 7,
  ).length;
  expect(focusCount).toBeGreaterThan(40);
  expect(focusCount).toBeLessThan(70);
  expect(facts.some((fact) => fact.a !== 7 && fact.b !== 7)).toBe(true);
  expect(facts.some((fact) => fact.a === 2 || fact.b === 2)).toBe(true);
});

test("switching prior off yields only the focus table", () => {
  const facts = pickMultiplicationFacts({
    focus: 7,
    includePrior: false,
    count: 40,
    next: createSeededRandom("only-seven"),
  });
  expect(facts.every((fact) => fact.a === 7 || fact.b === 7)).toBe(true);
});
