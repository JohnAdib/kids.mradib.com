import type { PracticePack } from "../pack/PracticePack";
import type { PrintColour } from "./PrintColour";
import type { PrintFont } from "./PrintFont";
import { PageHeader } from "./PageHeader";

type Props = {
  pack: PracticePack;
  font: PrintFont;
  colour: PrintColour;
};

export function AnswerPage({ pack, font, colour }: Props) {
  return (
    <div
      className={`print-root is-preview print-font-${font} print-colour-${colour}`}
    >
      <article className="print-page">
        <PageHeader
          brand="Kids · answers"
          label={pack.label}
          machineId={pack.machineId}
          showScore={false}
        />
        <h3 className="exercise-title">Answer sheet</h3>
        <p className="exercise-help">Keep this page away from the child.</p>
        <ol className="answer-list">
          {pack.answers.map((answer, index) => (
            <li key={`${answer}-${index}`}>{answer}</li>
          ))}
        </ol>
      </article>
    </div>
  );
}
