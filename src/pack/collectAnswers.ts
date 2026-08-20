import type { PackExercise } from "./PackExercise";

export function collectAnswers(exercises: PackExercise[]) {
  const answers: string[] = [];
  for (const exercise of exercises) {
    answers.push(...answersFor(exercise));
  }
  return answers;
}

function answersFor(exercise: PackExercise): string[] {
  switch (exercise.type) {
    case "timesFacts":
    case "missingNumber":
      return exercise.items.map(
        (item) =>
          `${item.blank === "left" ? item.answer : item.left} ${item.symbol} ${item.blank === "right" ? item.answer : item.right} = ${item.blank === "result" ? item.answer : item.result}`,
      );
    case "wheel":
      return exercise.wheels.flatMap((wheel) =>
        wheel.sectors.map(
          (sector) =>
            `${wheel.center} × ${sector.innerAnswer} = ${sector.outerAnswer}`,
        ),
      );
    case "matchLines":
      return exercise.pairs.map((pair) => `${pair.left} → ${pair.right}`);
    case "colourMultiples":
      return [
        exercise.grid.cells
          .filter(
            (cell) =>
              exercise.grid.focus !== 0 && cell % exercise.grid.focus === 0,
          )
          .join(", "),
      ];
    case "factFamily":
      return exercise.cards.map(
        (card) =>
          `${card.a} × ${card.b} = ${card.product}, ${card.product} ÷ ${card.a} = ${card.b}`,
      );
    case "trueFalse":
      return exercise.items.map(
        (item) => `${item.text} — ${item.correct ? "true" : "false"}`,
      );
    case "skipCount":
      return exercise.items.map((item) => item.answers.join(", "));
    case "arrayDots":
      return exercise.items.map(
        (item) => `${item.rows} × ${item.cols} = ${item.rows * item.cols}`,
      );
    case "partialSquare":
      return exercise.square.rows
        .flatMap((row, r) =>
          exercise.square.headers.map((header, c) => {
            if (exercise.square.cells[r]?.[c] !== null) {
              return "";
            }
            return `${row} × ${header} = ${row * header}`;
          }),
        )
        .filter(Boolean);
    case "oddOneOut":
      return exercise.items.map((item) => item.options[item.oddIndex] ?? "");
    case "whichIsMore":
      return exercise.items.map((item) => {
        const leftText = `${item.left.a} × ${item.left.b}`;
        const rightText = `${item.right.a} × ${item.right.b}`;
        if (item.leftValue > item.rightValue) {
          return `${leftText} > ${rightText}`;
        }
        if (item.leftValue < item.rightValue) {
          return `${leftText} < ${rightText}`;
        }
        return `${leftText} = ${rightText}`;
      });
    case "multiplesPath":
      return [
        exercise.cells
          .filter((cell) => cell.onPath)
          .map((cell) => cell.value)
          .join(", "),
      ];
    default:
      return [];
  }
}
