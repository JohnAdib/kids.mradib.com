import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { OddOneOutItem } from "./OddOneOutItem";
import { oddOneOutHelpText } from "./oddOneOutHelpText";

type Props = {
  items: OddOneOutItem[];
};

export function OddOneOutExercise({ items }: Props) {
  return (
    <section>
      <ExerciseHeading title="Odd one out">
        {oddOneOutHelpText(items)}
      </ExerciseHeading>
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
