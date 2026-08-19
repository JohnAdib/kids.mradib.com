import { expect, test } from "vitest";
import { createWheelExercise } from "./createWheelExercise";

test("multiplication wheels hide the outer ring", () => {
  const wheels = createWheelExercise({
    focus: 4,
    stage: "multiply",
    count: 6,
    next: () => 0.3,
  });
  expect(wheels).toHaveLength(6);
  expect(wheels[0]?.sectors.every((sector) => sector.outer === null)).toBe(
    true,
  );
  expect(wheels[0]?.sectors.every((sector) => sector.inner !== null)).toBe(
    true,
  );
});

test("each pizza wheel has every times-table fact", () => {
  const [wheel] = createWheelExercise({
    focus: 3,
    stage: "multiply",
    count: 1,
    next: () => 0.2,
  });
  expect(wheel?.sectors).toHaveLength(12);
  expect(
    wheel?.sectors
      .map((sector) => sector.innerAnswer)
      .slice()
      .sort((a, b) => a - b),
  ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
});
