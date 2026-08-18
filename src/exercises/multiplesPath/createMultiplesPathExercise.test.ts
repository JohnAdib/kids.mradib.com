import { expect, test } from "vitest";
import { createSeededRandom } from "../../rng/createSeededRandom";
import { createMultiplesPathExercise } from "./createMultiplesPathExercise";

test("the 1 times table still builds a path", () => {
  const cells = createMultiplesPathExercise({
    focus: 1,
    next: createSeededRandom("one"),
  });
  expect(cells).toHaveLength(80);
  expect(cells.some((cell) => !cell.onPath)).toBe(true);
});
