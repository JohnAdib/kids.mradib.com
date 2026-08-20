import type { ChartColouring } from "../charts/ChartColouring";
import { chartCellShade } from "../charts/chartCellShade";

type Props = {
  factors: number[];
  colouring: ChartColouring;
};

export function TimesTableGrid({ factors, colouring }: Props) {
  const empty = colouring === "blank";
  return (
    <div className="times-table-frame sheet-body">
      <table className="times-table">
        <thead>
          <tr>
            <th>×</th>
            {factors.map((factor) => (
              <th key={factor}>{factor}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {factors.map((row) => (
            <tr key={row}>
              <th>{row}</th>
              {factors.map((column) => (
                <td
                  className={`shade-${chartCellShade(row, column, colouring)}${empty ? " is-empty" : ""}`}
                  key={column}
                >
                  {empty ? null : row * column}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
