import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { ColourGrid } from "./ColourGrid";

type Props = {
  grid: ColourGrid;
};

export function ColourMultiplesExercise({ grid }: Props) {
  return (
    <section>
      <ExerciseHeading kind="colourMultiples">
        Colour every box that belongs to the {grid.focus} times table.
      </ExerciseHeading>
      <div className="colour-grid">
        {grid.cells.map((cell, index) => (
          <div className="colour-cell" key={`${cell}-${index}`}>
            {cell}
          </div>
        ))}
      </div>
    </section>
  );
}
