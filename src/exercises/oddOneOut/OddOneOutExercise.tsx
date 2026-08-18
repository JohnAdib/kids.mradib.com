import type { OddOneOutItem } from "./OddOneOutItem";

type Props = {
  items: OddOneOutItem[];
};

export function OddOneOutExercise({ items }: Props) {
  return (
    <section>
      <h3 className="exercise-title">Odd one out</h3>
      <p className="exercise-help">Circle the fact that is wrong.</p>
      <div className="skip-row">
        {items.map((item, index) => (
          <div className="odd-item" key={index}>
            {item.options.map((option) => (
              <span key={option} style={{ marginRight: "6mm" }}>
                {option}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
