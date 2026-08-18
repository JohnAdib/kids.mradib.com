import { Blank } from "../../print/Blank";
import { ExerciseHeading } from "../../print/ExerciseHeading";
import type { PartialSquare } from "./PartialSquare";

type Props = {
  square: PartialSquare;
};

export function PartialSquareExercise({ square }: Props) {
  return (
    <section>
      <ExerciseHeading kind="partialSquare">
        Complete this times table. Fill every empty box.
      </ExerciseHeading>
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
            <tr key={`${row}-${r}`}>
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
