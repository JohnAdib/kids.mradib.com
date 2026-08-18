import { Blank } from "../../print/Blank";
import type { SkipCountItem } from "./SkipCountItem";

type Props = {
  items: SkipCountItem[];
};

export function SkipCountExercise({ items }: Props) {
  return (
    <section>
      <h3 className="exercise-title">Skip counting</h3>
      <p className="exercise-help">Fill the gaps in each count.</p>
      <div className="skip-row">
        {items.map((item, index) => (
          <div className="skip-card" key={`${item.step}-${index}`}>
            {item.values.map((value, i) => (
              <span key={i}>{value === null ? <Blank /> : value}{i < item.values.length - 1 ? ", " : ""}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
