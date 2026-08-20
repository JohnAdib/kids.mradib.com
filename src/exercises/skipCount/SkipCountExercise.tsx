import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { SkipCountItem } from "./SkipCountItem";
import { SkipCountStep } from "./SkipCountStep";

type Props = {
  items: SkipCountItem[];
};

export function SkipCountExercise({ items }: Props) {
  return (
    <section>
      <ExerciseHeading title="Skip counting">
        Count on by the table. Fill each empty box.
      </ExerciseHeading>
      <div className="skip-row">
        {items.map((item, index) => (
          <div className="skip-card" key={`${item.step}-${index}`}>
            {item.values.map((value, i) => (
              <SkipCountStep
                key={i}
                value={value}
                showComma={i < item.values.length - 1}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
