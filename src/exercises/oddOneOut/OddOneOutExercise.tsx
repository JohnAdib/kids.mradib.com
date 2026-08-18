import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { OddOneOutItem } from "./OddOneOutItem";

type Props = {
  items: OddOneOutItem[];
};

export function OddOneOutExercise({ items }: Props) {
  return (
    <section>
      <ExerciseHeading kind="oddOneOut">
        Circle the fact that is wrong.
      </ExerciseHeading>
      <div className="skip-row">
        {items.map((item, index) => (
          <div className="odd-item" key={index}>
            {item.options.map((option) => (
              <span key={option} style={{ marginRight: "6mm" }}>
                {option}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
