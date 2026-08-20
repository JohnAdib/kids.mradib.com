import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { ArrayItem } from "./ArrayItem";
import { ArrayPrompt } from "./ArrayPrompt";
import { arrayDotsHelpText } from "./arrayDotsHelpText";

type Props = {
  items: ArrayItem[];
};

export function ArrayDotsExercise({ items }: Props) {
  return (
    <section>
      <ExerciseHeading title="Arrays">
        {arrayDotsHelpText(items)}
      </ExerciseHeading>
      <div
        className="array-row"
        style={{
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        }}
      >
        {items.map((item, index) => (
          <div
            className="array-card"
            key={`${item.stage}-${item.rows}x${item.cols}-${item.divideBy}-${index}`}
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
              <ArrayPrompt item={item} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
