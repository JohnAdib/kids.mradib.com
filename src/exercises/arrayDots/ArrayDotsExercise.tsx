import { Blank } from "../../print/Blank";
import { ExerciseHeading } from "../../print/ExerciseHeading";
import { fillGridTracks } from "../../print/fillGridTracks";
import type { ArrayItem } from "./ArrayItem";

type Props = {
  items: ArrayItem[];
};

export function ArrayDotsExercise({ items }: Props) {
  return (
    <section>
      <ExerciseHeading title="Arrays">
        Count the array, then write the product.
      </ExerciseHeading>
      <div
        className="array-row sheet-body"
        style={fillGridTracks(3, Math.ceil(items.length / 3))}
      >
        {items.map((item, index) => (
          <div
            className="array-card"
            key={`${item.rows}x${item.cols}-${index}`}
          >
            <div
              className="dot-array"
              style={{
                gridTemplateColumns: `repeat(${item.cols}, minmax(0, 3.4mm))`,
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
