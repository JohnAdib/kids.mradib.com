import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { OddOneOutItem } from "./OddOneOutItem";

type Props = {
  items: OddOneOutItem[];
};

export function OddOneOutExercise({ items }: Props) {
  return (
    <section>
      <ExerciseHeading>Circle the fact that is wrong.</ExerciseHeading>
      <div className="odd-list">
        {items.map((item, index) => (
          <div className="odd-item" key={index}>
            {item.options.map((option, optionIndex) => (
              <span className="odd-option" key={`${option}-${optionIndex}`}>
                {option}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
