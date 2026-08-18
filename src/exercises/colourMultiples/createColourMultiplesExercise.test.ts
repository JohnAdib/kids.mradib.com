import { expect, test } from "vitest";
import { createSeededRandom } from "../../rng/createSeededRandom";
import { createColourMultiplesExercise } from "./createColourMultiplesExercise";

test("the default 2 times table finishes with a 25-cell grid", () => {
  const grid = createColourMultiplesExercise({
    focus: 2,
    next: createSeededRandom("two"),
  });
  expect(grid.cells).toHaveLength(25);
  expect(grid.focus).toBe(2);
});
