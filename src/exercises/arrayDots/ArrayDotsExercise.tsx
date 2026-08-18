import { Blank } from "../../print/Blank";
import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { ArrayItem } from "./ArrayItem";

type Props = {
  items: ArrayItem[];
};

export function ArrayDotsExercise({ items }: Props) {
  return (
    <section>
      <ExerciseHeading kind="arrayDots">
        Count the dots, then write the fact.
      </ExerciseHeading>
      <div className="array-row">
        {items.map((item, index) => (
          <div
            className="array-card"
            key={`${item.rows}x${item.cols}-${index}`}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${item.cols}, 6mm)`,
                gap: "2mm",
                marginBottom: "3mm",
              }}
            >
              {Array.from({ length: item.rows * item.cols }, (_, i) => (
                <span key={i}>●</span>
              ))}
            </div>
            <p>
              {item.rows} × {item.cols} = <Blank />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
