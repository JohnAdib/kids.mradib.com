import { expect, test } from "vitest";
import { toDivisionFacts } from "./toDivisionFacts";

test("turns a product into both inverse divisions", () => {
  expect(toDivisionFacts({ a: 7, b: 8, product: 56 })).toEqual([
    { dividend: 56, divisor: 7, quotient: 8 },
    { dividend: 56, divisor: 8, quotient: 7 },
  ]);
});

test("never divides by zero", () => {
  expect(toDivisionFacts({ a: 2, b: 0, product: 0 })).toEqual([
    { dividend: 0, divisor: 2, quotient: 0 },
  ]);
});
