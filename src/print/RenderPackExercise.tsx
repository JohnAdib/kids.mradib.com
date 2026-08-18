import { ArrayDotsExercise } from "../exercises/arrayDots/ArrayDotsExercise";
import { ColourMultiplesExercise } from "../exercises/colourMultiples/ColourMultiplesExercise";
import { FactFamilyExercise } from "../exercises/factFamily/FactFamilyExercise";
import { MatchLinesExercise } from "../exercises/matchLines/MatchLinesExercise";
import { MissingNumberExercise } from "../exercises/missingNumber/MissingNumberExercise";
import { MultiplesPathExercise } from "../exercises/multiplesPath/MultiplesPathExercise";
import { OddOneOutExercise } from "../exercises/oddOneOut/OddOneOutExercise";
import { PartialSquareExercise } from "../exercises/partialSquare/PartialSquareExercise";
import { SkipCountExercise } from "../exercises/skipCount/SkipCountExercise";
import { TimesFactsExercise } from "../exercises/timesFacts/TimesFactsExercise";
import { TrueFalseExercise } from "../exercises/trueFalse/TrueFalseExercise";
import { WheelExercise } from "../exercises/wheel/WheelExercise";
import { WhichIsMoreExercise } from "../exercises/whichIsMore/WhichIsMoreExercise";
import type { PackExercise } from "../pack/PackExercise";

type Props = {
  exercise: PackExercise;
};

export function RenderPackExercise({ exercise }: Props) {
  switch (exercise.type) {
    case "timesFacts":
      return <TimesFactsExercise items={exercise.items} />;
    case "missingNumber":
      return <MissingNumberExercise items={exercise.items} />;
    case "wheel":
      return <WheelExercise wheels={exercise.wheels} />;
    case "matchLines":
      return <MatchLinesExercise pairs={exercise.pairs} />;
    case "colourMultiples":
      return <ColourMultiplesExercise grid={exercise.grid} />;
    case "factFamily":
      return <FactFamilyExercise cards={exercise.cards} />;
    case "trueFalse":
      return <TrueFalseExercise items={exercise.items} />;
    case "skipCount":
      return <SkipCountExercise items={exercise.items} />;
    case "arrayDots":
      return <ArrayDotsExercise items={exercise.items} />;
    case "partialSquare":
      return <PartialSquareExercise square={exercise.square} />;
    case "oddOneOut":
      return <OddOneOutExercise items={exercise.items} />;
    case "whichIsMore":
      return <WhichIsMoreExercise items={exercise.items} />;
    case "multiplesPath":
      return (
        <MultiplesPathExercise focus={exercise.focus} cells={exercise.cells} />
      );
  }
}
