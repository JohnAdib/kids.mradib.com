import { expect, test } from "vitest";
import { createWheelExercise } from "./createWheelExercise";

test("multiplication wheels hide the outer ring", () => {
  const wheels = createWheelExercise({
    focus: 4,
    stage: "multiply",
    count: 4,
    next: () => 0.3,
  });
  expect(wheels).toHaveLength(4);
  expect(wheels[0]?.sectors.every((sector) => sector.outer === null)).toBe(
    true,
  );
  expect(wheels[0]?.sectors.every((sector) => sector.inner !== null)).toBe(
    true,
  );
});
