import { Blank } from "../../print/Blank";
import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { SkipCountItem } from "./SkipCountItem";

type Props = {
  items: SkipCountItem[];
};

export function SkipCountExercise({ items }: Props) {
  return (
    <section>
      <ExerciseHeading>
        Count on by the table. Fill each empty box.
      </ExerciseHeading>
      <div className="skip-row">
        {items.map((item, index) => (
          <div className="skip-card" key={`${item.step}-${index}`}>
            {item.values.map((value, i) => (
              <span className="skip-step" key={i}>
                {value === null ? <Blank /> : value}
                {i < item.values.length - 1 ? <span>, </span> : null}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
