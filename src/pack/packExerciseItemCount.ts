import { timesFactsBandSize } from "../exercises/timesFacts/timesFactsBandSize";

type CountedKind =
  | "timesFacts"
  | "missingNumber"
  | "wheel"
  | "matchLines"
  | "factFamily"
  | "trueFalse"
  | "skipCount"
  | "arrayDots"
  | "oddOneOut"
  | "whichIsMore";

export function packExerciseItemCount(kind: CountedKind, shared: boolean) {
  switch (kind) {
    case "timesFacts":
      return shared ? timesFactsBandSize : timesFactsBandSize * 4;
    case "missingNumber":
      return shared ? 33 : 30;
    case "wheel":
      return shared ? 3 : 6;
    case "matchLines":
      return shared ? 8 : 10;
    case "factFamily":
      return 9;
    case "trueFalse":
      return shared ? 9 : 12;
    case "skipCount":
      return shared ? 10 : 12;
    case "arrayDots":
      return shared ? 6 : 9;
    case "oddOneOut":
      return shared ? 6 : 10;
    case "whichIsMore":
      return 42;
  }
}
