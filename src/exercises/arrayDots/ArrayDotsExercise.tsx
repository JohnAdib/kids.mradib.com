import { ExerciseHeading } from "../../print/ExerciseHeading";
import { fillGridTracks } from "../../print/fillGridTracks";
import type { ArrayItem } from "./ArrayItem";
import { ArrayPrompt } from "./ArrayPrompt";
import { arrayDotsHelpText } from "./arrayDotsHelpText";

type Props = {
  items: ArrayItem[];
};

const arrayColumns = 3;

export function ArrayDotsExercise({ items }: Props) {
  return (
    <section>
      <ExerciseHeading title="Arrays">
        {arrayDotsHelpText(items)}
      </ExerciseHeading>
      <div
        className="array-row sheet-body"
        style={fillGridTracks(
          arrayColumns,
          Math.ceil(items.length / arrayColumns),
        )}
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
