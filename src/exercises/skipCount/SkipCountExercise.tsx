import { Blank } from "../../print/Blank";
import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { SkipCountItem } from "./SkipCountItem";

type Props = {
  items: SkipCountItem[];
};

export function SkipCountExercise({ items }: Props) {
  return (
    <section>
      <ExerciseHeading kind="skipCount">
        Fill the gaps in each count.
      </ExerciseHeading>
      <div className="skip-row">
        {items.map((item, index) => (
          <div className="skip-card" key={`${item.step}-${index}`}>
            {item.values.map((value, i) => (
              <span key={i}>
                {value === null ? <Blank /> : value}
                {i < item.values.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
