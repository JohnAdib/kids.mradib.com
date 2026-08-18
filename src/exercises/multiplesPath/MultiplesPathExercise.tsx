import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { PathCell } from "./PathCell";

type Props = {
  focus: number;
  cells: PathCell[];
};

export function MultiplesPathExercise({ focus, cells }: Props) {
  return (
    <section>
      <ExerciseHeading kind="multiplesPath">
        Colour a path using only numbers in the {focus} times table.
      </ExerciseHeading>
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
