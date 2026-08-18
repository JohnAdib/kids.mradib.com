import { expect, test } from "vitest";
import { createTimesFactsExercise } from "./createTimesFactsExercise";

test("a times-facts page blanks the product of a times b", () => {
  const items = createTimesFactsExercise({
    multiply: [{ a: 3, b: 4, product: 12 }],
    divide: [{ dividend: 12, divisor: 3, quotient: 4 }],
    stage: "multiply",
    count: 4,
    next: () => 0.1,
  });
  expect(items).toHaveLength(4);
  expect(items.every((item) => item.symbol === "×")).toBe(true);
  expect(items.every((item) => item.blank === "result")).toBe(true);
  expect(items.every((item) => item.answer === 12)).toBe(true);
});

test("division stage blanks the quotient", () => {
  const items = createTimesFactsExercise({
    multiply: [{ a: 5, b: 6, product: 30 }],
    divide: [{ dividend: 30, divisor: 5, quotient: 6 }],
    stage: "divide",
    count: 2,
    next: () => 0.9,
  });
  expect(items.every((item) => item.symbol === "÷")).toBe(true);
  expect(items.every((item) => item.blank === "result")).toBe(true);
  expect(items[0]?.answer).toBe(6);
});
