import { countMarkableItems } from "../pack/countMarkableItems";
import type { PracticePack } from "../pack/PracticePack";
import { pageComboTitle } from "../pack/pageComboTitle";
import { PageHeader } from "./PageHeader";
import type { PrintColour } from "./PrintColour";
import type { PrintFont } from "./PrintFont";
import { PrintPage } from "./PrintPage";
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
      {pack.pages.map((page, index) => {
        return (
          <PrintPage key={index}>
            <PageHeader
              title={pageComboTitle(page.exercises.map((item) => item.type))}
              itemCount={countMarkableItems(page.exercises)}
              showScore
            />
            {page.exercises.map((item, exerciseIndex) => (
              <RenderPackExercise
                exercise={item}
                key={`${item.type}-${exerciseIndex}`}
              />
            ))}
          </PrintPage>
        );
      })}
    </div>
  );
}
