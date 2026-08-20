import { ExerciseHeading } from "../../print/ExerciseHeading";
import { fillGridTracks } from "../../print/fillGridTracks";
import type { ColourGrid } from "./ColourGrid";

type Props = {
  grid: ColourGrid;
};

export function ColourMultiplesExercise({ grid }: Props) {
  return (
    <section>
      <ExerciseHeading title="Colour the multiples">
        Colour every box that is a multiple of {grid.focus}.
      </ExerciseHeading>
      <div
        className="colour-grid sheet-body"
        style={fillGridTracks(
          grid.columns,
          Math.ceil(grid.cells.length / grid.columns),
        )}
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
