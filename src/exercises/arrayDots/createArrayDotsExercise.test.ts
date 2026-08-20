import { expect, test } from "vitest";
import { createSeededRandom } from "../../rng/createSeededRandom";
import { createArrayDotsExercise } from "./createArrayDotsExercise";

test("a 2 times table page can show all twelve facts as dots", () => {
  const table = Array.from({ length: 12 }, (_, index) => {
    const other = index + 1;
    return { a: 2, b: other, product: 2 * other };
  });
  const repeated = Array.from({ length: 12 }, () => table[2] ?? table[0]);
  const items = createArrayDotsExercise({
    facts: [...repeated, ...table],
    count: 12,
    stage: "multiply",
    next: createSeededRandom("arrays-2"),
  });
  expect(items).toHaveLength(12);
  expect(items.some((item) => item.rows === 2 && item.cols === 12)).toBe(true);
  expect(new Set(items.map((item) => `${item.rows}x${item.cols}`)).size).toBe(
    12,
  );
  expect(items.every((item) => item.stage === "multiply")).toBe(true);
});

test("divide stage asks for the quotient", () => {
  const facts = Array.from({ length: 12 }, (_, index) => {
    const other = index + 1;
    return { a: 3, b: other, product: 3 * other };
  });
  const items = createArrayDotsExercise({
    facts,
    count: 6,
    stage: "divide",
    next: createSeededRandom("arrays-divide"),
  });
  expect(items.every((item) => item.stage === "divide")).toBe(true);
});
