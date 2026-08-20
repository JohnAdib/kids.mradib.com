import { ExerciseHeading } from "../../print/ExerciseHeading";
import { fillGridTracks } from "../../print/fillGridTracks";
import type { PathCell } from "./PathCell";
import { pathGrid } from "./pathGrid";

type Props = {
  focus: number;
  cells: PathCell[];
};

export function MultiplesPathExercise({ focus, cells }: Props) {
  return (
    <section>
      <ExerciseHeading>
        Colour a path of multiples of {focus}. Touching boxes only.
      </ExerciseHeading>
      <div
        className="path-grid sheet-body"
        style={fillGridTracks(pathGrid.columns, pathGrid.rows)}
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
