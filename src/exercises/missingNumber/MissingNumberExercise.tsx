import { Blank } from "../../print/Blank";
import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { MissingNumberItem } from "./MissingNumberItem";

type Props = {
  items: MissingNumberItem[];
};

export function MissingNumberExercise({ items }: Props) {
  return (
    <section>
      <ExerciseHeading kind="missingNumber">
        Any part of the fact can be empty.
      </ExerciseHeading>
      <div className="missing-grid">
        {items.map((item, index) => (
          <div
            className="missing-item"
            key={`${item.left}-${item.right}-${index}`}
          >
            <span>{cell(item, "left")}</span>
            <span>{item.symbol}</span>
            <span>{cell(item, "right")}</span>
            <span>=</span>
            <span>{cell(item, "result")}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function cell(item: MissingNumberItem, slot: MissingNumberItem["blank"]) {
  if (item.blank === slot) {
    return <Blank />;
  }
  if (slot === "left") {
    return item.left;
  }
  if (slot === "right") {
    return item.right;
  }
  return item.result;
}
