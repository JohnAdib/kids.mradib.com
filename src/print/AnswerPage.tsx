import type { PracticePack } from "../pack/PracticePack";
import { PageHeader } from "./PageHeader";
import type { PrintColour } from "./PrintColour";
import type { PrintFont } from "./PrintFont";
import { PrintPage } from "./PrintPage";

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
      <PrintPage>
        <PageHeader title="Answer sheet" label={pack.label} showScore={false} />
        <p className="exercise-help">Keep this page away from the child.</p>
        <ol className="answer-list">
          {pack.answers.map((answer, index) => (
            <li key={`${answer}-${index}`}>{answer}</li>
          ))}
        </ol>
      </PrintPage>
    </div>
  );
}
