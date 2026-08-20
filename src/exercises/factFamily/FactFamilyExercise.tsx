import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { FactFamilyCard } from "./FactFamilyCard";
import { FactFamilyLineView } from "./FactFamilyLineView";
import { factFamilyHelpText } from "./factFamilyHelpText";
import { factFamilyStageFromCards } from "./factFamilyStageFromCards";

type Props = {
  cards: FactFamilyCard[];
};

export function FactFamilyExercise({ cards }: Props) {
  const stage = factFamilyStageFromCards(cards);
  return (
    <section>
      <ExerciseHeading title="Fact family">
        {factFamilyHelpText(stage)}
      </ExerciseHeading>
      <div className="family-row">
        {cards.map((card, index) => (
          <div className="family-card" key={`${card.a}-${card.b}-${index}`}>
            {card.lines.map((line, lineIndex) => (
              <FactFamilyLineView
                line={line}
                key={`${line.answer}-${lineIndex}`}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
