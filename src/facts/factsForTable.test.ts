import { expect, test } from "vitest";
import { factsForTable } from "./factsForTable";

test("a table quiz stays on factors 1 to 12", () => {
  const facts = factsForTable(3);
  expect(facts.every((fact) => fact.a >= 1 && fact.b >= 1)).toBe(true);
  expect(facts.some((fact) => fact.a === 0 || fact.b === 0)).toBe(false);
  expect(facts).toContainEqual({ a: 3, b: 7, product: 21 });
  expect(facts).toContainEqual({ a: 7, b: 3, product: 21 });
});
