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
            key={`${item.symbol}-${item.left.a}-${item.left.b}-${item.right.a}-${item.right.b}-${index}`}
          >
            <CompareExpression
              a={item.left.a}
              b={item.left.b}
              symbol={item.symbol}
            />
            <Blank />
            <CompareExpression
              a={item.right.a}
              b={item.right.b}
              symbol={item.symbol}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
