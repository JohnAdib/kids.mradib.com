import type { ArrayItem } from "../exercises/arrayDots/ArrayItem";
import type { ColourGrid } from "../exercises/colourMultiples/ColourGrid";
import type { FactFamilyCard } from "../exercises/factFamily/FactFamilyCard";
import type { MatchPair } from "../exercises/matchLines/MatchPair";
import type { MissingNumberItem } from "../exercises/missingNumber/MissingNumberItem";
import type { PathCell } from "../exercises/multiplesPath/PathCell";
import type { OddOneOutItem } from "../exercises/oddOneOut/OddOneOutItem";
import type { PartialSquare } from "../exercises/partialSquare/PartialSquare";
import type { SkipCountItem } from "../exercises/skipCount/SkipCountItem";
import type { TrueFalseItem } from "../exercises/trueFalse/TrueFalseItem";
import type { WheelSpec } from "../exercises/wheel/WheelSpec";
import type { CompareItem } from "../exercises/whichIsMore/CompareItem";

export type PackExercise =
  | { type: "timesFacts"; items: MissingNumberItem[] }
  | { type: "missingNumber"; items: MissingNumberItem[] }
  | { type: "wheel"; wheels: WheelSpec[] }
  | { type: "matchLines"; pairs: MatchPair[] }
  | { type: "colourMultiples"; grid: ColourGrid }
  | { type: "factFamily"; cards: FactFamilyCard[] }
  | { type: "trueFalse"; items: TrueFalseItem[] }
  | { type: "skipCount"; items: SkipCountItem[] }
  | { type: "arrayDots"; items: ArrayItem[] }
  | { type: "partialSquare"; square: PartialSquare }
  | { type: "oddOneOut"; items: OddOneOutItem[] }
  | { type: "whichIsMore"; items: CompareItem[] }
  | { type: "multiplesPath"; focus: number; cells: PathCell[] };
