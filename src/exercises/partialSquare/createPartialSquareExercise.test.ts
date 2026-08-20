import { expect, test } from "vitest";
import { createPartialSquareExercise } from "./createPartialSquareExercise";

test("a 2 pack is still a full zero-to-twelve square", () => {
  const square = createPartialSquareExercise({
    tables: [2],
  });
  expect(square.headers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  expect(square.rows).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  expect(square.cells).toHaveLength(13);
  expect(square.cells.every((row) => row.length === 13)).toBe(true);
  expect(square.focusTables).toEqual([2]);
});

test("selected table blanks its whole row and column", () => {
  const square = createPartialSquareExercise({
    tables: [3],
  });
  square.cells.forEach((row, rowIndex) => {
    const rowFactor = square.rows[rowIndex] ?? -1;
    row.forEach((cell, colIndex) => {
      const colFactor = square.headers[colIndex] ?? -1;
      if (rowFactor === 3 || colFactor === 3) {
        expect(cell).toBeNull();
      } else {
        expect(cell).toBe(rowFactor * colFactor);
      }
    });
  });
});
