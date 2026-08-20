import { expect, test } from "vitest";
import { factsForTable } from "./factsForTable";

test("a table quiz includes zero through twelve", () => {
  const facts = factsForTable(3);
  expect(facts).toContainEqual({ a: 3, b: 0, product: 0 });
  expect(facts).toContainEqual({ a: 0, b: 3, product: 0 });
  expect(facts).toContainEqual({ a: 3, b: 7, product: 21 });
  expect(facts).toContainEqual({ a: 7, b: 3, product: 21 });
  expect(facts).toContainEqual({ a: 3, b: 12, product: 36 });
});
