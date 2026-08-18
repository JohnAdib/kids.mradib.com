import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { MatchPair } from "./MatchPair";

type Props = {
  pairs: MatchPair[];
};

export function MatchLinesExercise({ pairs }: Props) {
  const left = [...pairs].sort((a, b) => a.leftOffset - b.leftOffset);
  const right = [...pairs].sort((a, b) => a.rightOffset - b.rightOffset);
  return (
    <section>
      <ExerciseHeading kind="matchLines">
        Draw a line from each fact to the matching number.
      </ExerciseHeading>
      <div className="match-board">
        <div className="match-col">
          {left.map((pair) => (
            <div className="match-chip" key={pair.left}>
              {pair.left}
            </div>
          ))}
        </div>
        <div className="match-col">
          {right.map((pair) => (
            <div className="match-chip" key={pair.right}>
              {pair.right}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
