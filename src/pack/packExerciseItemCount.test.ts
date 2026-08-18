import { expect, test } from "vitest";
import { packExerciseItemCount } from "./packExerciseItemCount";

test("shared compare puzzles fill half a page instead of a sparse strip", () => {
  expect(packExerciseItemCount("whichIsMore", true)).toBe(42);
  expect(packExerciseItemCount("missingNumber", true)).toBe(33);
});
