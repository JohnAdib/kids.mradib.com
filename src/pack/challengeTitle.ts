import type { PackExercise } from "./PackExercise";

export function challengeTitle(kind: PackExercise["type"]) {
  switch (kind) {
    case "timesFacts":
      return "Times pop";
    case "missingNumber":
      return "Sneaky blanks";
    case "wheel":
      return "Pizza wheel";
    case "matchLines":
      return "Join the pals";
    case "colourMultiples":
      return "Paint hunt";
    case "factFamily":
      return "Fact house";
    case "trueFalse":
      return "Yes or no";
    case "skipCount":
      return "Frog hops";
    case "arrayDots":
      return "Egg boxes";
    case "partialSquare":
      return "Broken grid";
    case "oddOneOut":
      return "Odd sock";
    case "whichIsMore":
      return "Bigger pile";
    case "multiplesPath":
      return "Treasure trail";
  }
}
