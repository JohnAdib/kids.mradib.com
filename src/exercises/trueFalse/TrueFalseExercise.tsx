import type { TrueFalseItem } from "./TrueFalseItem";

type Props = {
  items: TrueFalseItem[];
};

export function TrueFalseExercise({ items }: Props) {
  return (
    <section>
      <h3 className="exercise-title">True or false</h3>
      <p className="exercise-help">Tick the true facts. Cross the false ones.</p>
      <div className="missing-grid">
        {items.map((item, index) => (
          <div className="true-false-item" key={`${item.text}-${index}`}>
            <span>□</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
