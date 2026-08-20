import { ExerciseHeading } from "../../print/ExerciseHeading";
import { FactSlot } from "../../print/FactSlot";
import type { FactFamilyCard } from "./FactFamilyCard";

type Props = {
  cards: FactFamilyCard[];
};

export function FactFamilyExercise({ cards }: Props) {
  return (
    <section>
      <ExerciseHeading title="Fact family">
        These four facts belong together. Fill the empty box.
      </ExerciseHeading>
      <div className="family-row">
        {cards.map((card, index) => (
          <div className="family-card" key={`${card.a}-${card.b}-${index}`}>
            <p>
              {num(card, "a")} × {num(card, "b")} = {num(card, "product")}
            </p>
            <p>
              {num(card, "b")} × {num(card, "a")} = {num(card, "product")}
            </p>
            <p>
              {num(card, "product")} ÷ {num(card, "a")} = {div(card, "divA")}
            </p>
            <p>
              {num(card, "product")} ÷ {num(card, "b")} = {div(card, "divB")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function num(card: FactFamilyCard, slot: "a" | "b" | "product") {
  return <FactSlot value={card.hide === slot ? null : card[slot]} />;
}

function div(card: FactFamilyCard, slot: "divA" | "divB") {
  const value = slot === "divA" ? card.b : card.a;
  return <FactSlot value={card.hide === slot ? null : value} />;
}
