import { expect, test } from "vitest";
import { createSeededRandom } from "../../rng/createSeededRandom";
import { createColourMultiplesExercise } from "./createColourMultiplesExercise";

test("the default 2 times table finishes with a dense grid", () => {
  const grid = createColourMultiplesExercise({
    focus: 2,
    next: createSeededRandom("two"),
  });
  expect(grid.cells).toHaveLength(100);
  expect(grid.columns).toBe(10);
  expect(grid.focus).toBe(2);
  expect(grid.cells.every((cell) => cell > 0)).toBe(true);
});
