import type { PackExercise } from "./PackExercise";

export function challengeTitle(kind: PackExercise["type"]) {
  switch (kind) {
    case "timesFacts":
      return "Times pop";
    case "missingNumber":
      return "Missing number";
    case "wheel":
      return "Pizza wheels";
    case "matchLines":
      return "Match up";
    case "colourMultiples":
      return "Colour the multiples";
    case "factFamily":
      return "Fact family";
    case "trueFalse":
      return "Yes or no";
    case "skipCount":
      return "Skip counting";
    case "arrayDots":
      return "Arrays";
    case "partialSquare":
      return "Complete the square";
    case "oddOneOut":
      return "Odd one out";
    case "whichIsMore":
      return "Which is more?";
    case "multiplesPath":
      return "Follow the path";
  }
}
