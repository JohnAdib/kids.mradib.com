import { Blank } from "../../print/Blank";
import type { FactFamilyCard } from "./FactFamilyCard";

type Props = {
  cards: FactFamilyCard[];
};

export function FactFamilyExercise({ cards }: Props) {
  return (
    <section>
      <h3 className="exercise-title">Fact families</h3>
      <p className="exercise-help">
        Four facts live together. Fill the empty one.
      </p>
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
  if (card.hide === slot) {
    return <Blank />;
  }
  return card[slot];
}

function div(card: FactFamilyCard, slot: "divA" | "divB") {
  if (card.hide === slot) {
    return <Blank />;
  }
  return slot === "divA" ? card.b : card.a;
}
