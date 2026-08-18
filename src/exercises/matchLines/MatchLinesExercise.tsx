import { ExerciseHeading } from "../../print/ExerciseHeading";
import { rowLetter } from "../../print/rowLetter";
import type { MatchPair } from "./MatchPair";

type Props = {
  pairs: MatchPair[];
};

export function MatchLinesExercise({ pairs }: Props) {
  const facts = [...pairs].sort((a, b) => a.leftOffset - b.leftOffset);
  const answers = [...pairs].sort((a, b) => a.rightOffset - b.rightOffset);
  return (
    <section>
      <ExerciseHeading>
        Draw a line from each fact to its answer.
      </ExerciseHeading>
      <div className="match-board">
        <div className="match-col match-col-facts">
          {facts.map((pair, index) => (
            <div className="match-row" key={`fact-${pair.leftOffset}`}>
              <span className="match-mark">{rowLetter(index)}</span>
              <span className="match-chip">{pair.left}</span>
              <span className="match-dot" />
            </div>
          ))}
        </div>
        <div className="match-col match-col-answers">
          {answers.map((pair) => (
            <div className="match-row" key={`answer-${pair.rightOffset}`}>
              <span className="match-dot" />
              <span className="match-chip">{pair.right}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
