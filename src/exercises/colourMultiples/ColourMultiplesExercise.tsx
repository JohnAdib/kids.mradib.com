import type { ColourGrid } from "./ColourGrid";

type Props = {
  grid: ColourGrid;
};

export function ColourMultiplesExercise({ grid }: Props) {
  return (
    <section>
      <h3 className="exercise-title">Colour the multiples</h3>
      <p className="exercise-help">
        Colour every box that belongs to the {grid.focus} times table.
      </p>
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
