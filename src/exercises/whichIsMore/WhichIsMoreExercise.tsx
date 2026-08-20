import { Blank } from "../../print/Blank";
import { ExerciseHeading } from "../../print/ExerciseHeading";
import { CompareExpression } from "./CompareExpression";
import type { CompareItem } from "./CompareItem";

type Props = {
  items: CompareItem[];
};

export function WhichIsMoreExercise({ items }: Props) {
  return (
    <section>
      <ExerciseHeading title="Which is more?">
        Write &gt;, &lt; or = in the box.
      </ExerciseHeading>
      <div className="compare-grid">
        {items.map((item, index) => (
          <div
            className="compare-item"
            key={`${item.left.a}x${item.left.b}-${item.right.a}x${item.right.b}-${index}`}
          >
            <CompareExpression a={item.left.a} b={item.left.b} />
            <Blank />
            <CompareExpression a={item.right.a} b={item.right.b} />
          </div>
        ))}
      </div>
    </section>
  );
}
