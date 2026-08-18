import { ExerciseHeading } from "../../print/ExerciseHeading";
import { FactSlot } from "../../print/FactSlot";
import type { MissingNumberItem } from "./MissingNumberItem";

type Props = {
  items: MissingNumberItem[];
};

export function MissingNumberExercise({ items }: Props) {
  return (
    <section>
      <ExerciseHeading kind="missingNumber">
        A factor or the product is missing. Fill the box.
      </ExerciseHeading>
      <div className="missing-grid">
        {items.map((item, index) => (
          <div
            className="missing-item"
            key={`${item.left}-${item.right}-${index}`}
          >
            <FactSlot value={item.blank === "left" ? null : item.left} />
            <span>{item.symbol}</span>
            <FactSlot value={item.blank === "right" ? null : item.right} />
            <span>=</span>
            <FactSlot value={item.blank === "result" ? null : item.result} />
          </div>
        ))}
      </div>
    </section>
  );
}
