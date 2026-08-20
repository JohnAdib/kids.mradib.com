import { expect, test } from "vitest";
import { createSeededRandom } from "../../rng/createSeededRandom";
import { createPartialSquareExercise } from "./createPartialSquareExercise";

test("a 2 pack is still a full zero-to-twelve square", () => {
  const square = createPartialSquareExercise({
    tables: [2],
    next: createSeededRandom("square-2"),
  });
  expect(square.headers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  expect(square.rows).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  expect(square.cells).toHaveLength(13);
  expect(square.cells.every((row) => row.length === 13)).toBe(true);
  expect(square.focusTables).toEqual([2]);
});

test("only selected table rows get blanks", () => {
  const square = createPartialSquareExercise({
    tables: [2],
    next: createSeededRandom("square-2-focus"),
  });
  square.cells.forEach((row, rowIndex) => {
    const rowFactor = square.rows[rowIndex];
    row.forEach((cell) => {
      if (rowFactor !== 2) {
        expect(cell).not.toBeNull();
      }
    });
  });
  expect(square.cells[2]?.some((cell) => cell === null)).toBe(true);
});
