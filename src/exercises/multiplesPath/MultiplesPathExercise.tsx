import type { PathCell } from "./PathCell";

type Props = {
  focus: number;
  cells: PathCell[];
};

export function MultiplesPathExercise({ focus, cells }: Props) {
  return (
    <section>
      <h3 className="exercise-title">Follow the multiples</h3>
      <p className="exercise-help">
        Colour a path using only numbers in the {focus} times table.
      </p>
      <div className="path-grid">
        {cells.map((cell, index) => (
          <div className="path-cell" key={`${cell.value}-${index}`}>
            {cell.value}
          </div>
        ))}
      </div>
    </section>
  );
}
