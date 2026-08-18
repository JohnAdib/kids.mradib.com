import type { PackExercise } from "./PackExercise";

export function countMarkableItems(exercises: PackExercise[]) {
  return exercises.reduce((sum, exercise) => sum + countOne(exercise), 0);
}

function countOne(exercise: PackExercise) {
  switch (exercise.type) {
    case "missingNumber":
      return exercise.items.length;
    case "wheel":
      return exercise.wheels.reduce(
        (sum, wheel) =>
          sum +
          wheel.sectors.filter(
            (sector) => sector.inner === null || sector.outer === null,
          ).length,
        0,
      );
    case "matchLines":
      return exercise.pairs.length;
    case "colourMultiples":
      return exercise.grid.cells.filter(
        (cell) => exercise.grid.focus !== 0 && cell % exercise.grid.focus === 0,
      ).length;
    case "factFamily":
      return exercise.cards.length;
    case "trueFalse":
      return exercise.items.length;
    case "skipCount":
      return exercise.items.reduce((sum, item) => sum + item.answers.length, 0);
    case "arrayDots":
      return exercise.items.length;
    case "partialSquare":
      return exercise.square.cells.flat().filter((cell) => cell === null)
        .length;
    case "oddOneOut":
      return exercise.items.length;
    case "whichIsMore":
      return exercise.items.length;
    case "multiplesPath":
      return exercise.cells.filter((cell) => cell.onPath).length;
    default:
      return 0;
  }
}
