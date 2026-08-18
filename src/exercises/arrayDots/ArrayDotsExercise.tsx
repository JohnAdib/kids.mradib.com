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
        Count the array, then write the product.
      </ExerciseHeading>
      <div className="array-row">
        {items.map((item, index) => (
          <div
            className="array-card"
            key={`${item.rows}x${item.cols}-${index}`}
          >
            <div
              className="dot-array"
              style={{
                gridTemplateColumns: `repeat(${item.cols}, 3.4mm)`,
              }}
            >
              {Array.from({ length: item.rows * item.cols }, (_, i) => (
                <span className="dot" key={i} />
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
