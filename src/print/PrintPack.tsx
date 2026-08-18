import type { PracticePack } from "../pack/PracticePack";
import { PageHeader } from "./PageHeader";
import type { PrintColour } from "./PrintColour";
import type { PrintFont } from "./PrintFont";
import { RenderPackExercise } from "./RenderPackExercise";

type Props = {
  pack: PracticePack;
  font: PrintFont;
  colour: PrintColour;
};

export function PrintPack({ pack, font, colour }: Props) {
  return (
    <div
      className={`print-root is-preview print-font-${font} print-colour-${colour}`}
    >
      {pack.pages.map((page, index) => (
        <article className="print-page" key={index}>
          <PageHeader
            brand="Kids"
            label={pack.label}
            machineId={pack.machineId}
            suggestedSeconds={pack.suggestedSeconds}
            itemCount={pack.itemCount}
            showScore
          />
          {page.exercises.map((exercise, exerciseIndex) => (
            <RenderPackExercise
              exercise={exercise}
              key={`${exercise.type}-${exerciseIndex}`}
            />
          ))}
        </article>
      ))}
    </div>
  );
}
