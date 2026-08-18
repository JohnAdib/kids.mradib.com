import { Blank } from "../../print/Blank";
import type { PartialSquare } from "./PartialSquare";

type Props = {
  square: PartialSquare;
};

export function PartialSquareExercise({ square }: Props) {
  return (
    <section>
      <h3 className="exercise-title">Finish the square</h3>
      <p className="exercise-help">Fill every empty cell.</p>
      <table className="partial-square">
        <thead>
          <tr>
            <th>×</th>
            {square.headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {square.rows.map((row, r) => (
            <tr key={row}>
              <th>{row}</th>
              {square.cells[r]?.map((cell, c) => (
                <td key={c}>{cell === null ? <Blank /> : cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
