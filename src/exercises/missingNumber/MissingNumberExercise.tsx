import { Blank } from "../../print/Blank";
import type { MissingNumberItem } from "./MissingNumberItem";

type Props = {
  items: MissingNumberItem[];
};

export function MissingNumberExercise({ items }: Props) {
  return (
    <section>
      <h3 className="exercise-title">Fill in the missing number</h3>
      <p className="exercise-help">Any part of the fact can be empty.</p>
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
