import { expect, test } from "vitest";
import { createMissingNumberExercise } from "./createMissingNumberExercise";

test("mixed missing-number items keep a solvable answer", () => {
  const items = createMissingNumberExercise({
    multiply: [{ a: 3, b: 4, product: 12 }],
    divide: [{ dividend: 12, divisor: 3, quotient: 4 }],
    stage: "mixed",
    count: 6,
    next: () => 0.2,
  });
  expect(items.length).toBe(6);
  expect(items.every((item) => item.answer >= 0)).toBe(true);
});
