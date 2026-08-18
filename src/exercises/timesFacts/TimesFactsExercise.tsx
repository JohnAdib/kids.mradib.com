import { ExerciseHeading } from "../../print/ExerciseHeading";
import { FactSlot } from "../../print/FactSlot";
import type { MissingNumberItem } from "../missingNumber/MissingNumberItem";

type Props = {
  items: MissingNumberItem[];
};

export function TimesFactsExercise({ items }: Props) {
  return (
    <section>
      <ExerciseHeading kind="timesFacts">
        Write the answer. Keep going down the page.
      </ExerciseHeading>
      <div className="times-facts-grid">
        {items.map((item, index) => (
          <div
            className="times-fact"
            key={`${item.left}-${item.symbol}-${item.right}-${index}`}
          >
            <FactSlot value={item.left} />
            <span>{item.symbol}</span>
            <FactSlot value={item.right} />
            <span>=</span>
            <FactSlot value={null} />
          </div>
        ))}
      </div>
    </section>
  );
}
