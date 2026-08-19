import { expect, test } from "vitest";
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
  });
  expect(items).toHaveLength(12);
  expect(items).toContainEqual({ rows: 2, cols: 12 });
  expect(new Set(items.map((item) => `${item.rows}x${item.cols}`)).size).toBe(
    12,
  );
});
