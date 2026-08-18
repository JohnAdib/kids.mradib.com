import { Blank } from "../../print/Blank";
import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { CompareItem } from "./CompareItem";

type Props = {
  items: CompareItem[];
};

export function WhichIsMoreExercise({ items }: Props) {
  return (
    <section>
      <ExerciseHeading kind="whichIsMore">
        Write &gt;, &lt; or = in the box.
      </ExerciseHeading>
      <div className="compare-grid">
        {items.map((item, index) => (
          <div className="compare-item" key={`${item.leftText}-${index}`}>
            <span>{item.leftText}</span>
            <Blank />
            <span>{item.rightText}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
