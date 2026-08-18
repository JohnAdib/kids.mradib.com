import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { TrueFalseItem } from "./TrueFalseItem";

type Props = {
  items: TrueFalseItem[];
};

export function TrueFalseExercise({ items }: Props) {
  return (
    <section>
      <ExerciseHeading kind="trueFalse">
        Tick the true facts. Cross the false ones.
      </ExerciseHeading>
      <div className="missing-grid">
        {items.map((item, index) => (
          <div className="true-false-item" key={`${item.text}-${index}`}>
            <span>□</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
