import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { ColourGrid } from "./ColourGrid";

type Props = {
  grid: ColourGrid;
};

export function ColourMultiplesExercise({ grid }: Props) {
  return (
    <section>
      <ExerciseHeading kind="colourMultiples">
        Colour every box that is a multiple of {grid.focus}.
      </ExerciseHeading>
      <div
        className="colour-grid"
        style={{ gridTemplateColumns: `repeat(${grid.columns}, 1fr)` }}
      >
        {grid.cells.map((cell, index) => (
          <div className="colour-cell" key={`${cell}-${index}`}>
            {cell}
          </div>
        ))}
      </div>
    </section>
  );
}
