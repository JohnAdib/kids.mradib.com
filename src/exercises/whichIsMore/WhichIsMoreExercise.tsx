import { Blank } from "../../print/Blank";
import type { CompareItem } from "./CompareItem";

type Props = {
  items: CompareItem[];
};

export function WhichIsMoreExercise({ items }: Props) {
  return (
    <section>
      <h3 className="exercise-title">Which is more?</h3>
      <p className="exercise-help">Write &gt;, &lt; or = in the middle.</p>
      <div className="missing-grid">
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
