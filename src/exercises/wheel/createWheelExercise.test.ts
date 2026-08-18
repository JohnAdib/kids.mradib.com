import { expect, test } from "vitest";
import { createWheelExercise } from "./createWheelExercise";

test("multiplication wheels hide the outer ring", () => {
  const [wheel] = createWheelExercise({
    focus: 4,
    stage: "multiply",
    count: 1,
    next: () => 0.3,
  });
  expect(wheel?.sectors.every((sector) => sector.outer === null)).toBe(true);
  expect(wheel?.sectors.every((sector) => sector.inner !== null)).toBe(true);
});
