import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { PathCell } from "./PathCell";
import { pathGrid } from "./pathGrid";

type Props = {
  focus: number;
  cells: PathCell[];
};

export function MultiplesPathExercise({ focus, cells }: Props) {
  return (
    <section>
      <ExerciseHeading title="Follow the path">
        Colour a path of multiples of {focus}. Touching boxes only.
      </ExerciseHeading>
      <div
        className="path-grid"
        style={{
          gridTemplateColumns: `repeat(${pathGrid.columns}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((cell, index) => (
          <div className="path-cell" key={`${cell.value}-${index}`}>
            {cell.value}
          </div>
        ))}
      </div>
    </section>
  );
}
