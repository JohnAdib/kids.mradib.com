import type { ChartColouring } from "../charts/ChartColouring";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { PrintActions } from "./PrintActions";
import { PrintSettings } from "./PrintSettings";

type Props = {
  includeZero: boolean;
  lastFactor: number;
  colouring: ChartColouring;
  font: PrintFont;
  colour: PrintColour;
  onIncludeZero: (value: boolean) => void;
  onLastFactor: (value: number) => void;
  onColouring: (value: ChartColouring) => void;
  onFont: (font: PrintFont) => void;
  onColour: (colour: PrintColour) => void;
  onPrint: () => void;
};

export function ChartForm({
  includeZero,
  lastFactor,
  colouring,
  font,
  colour,
  onIncludeZero,
  onLastFactor,
  onColouring,
  onFont,
  onColour,
  onPrint,
}: Props) {
  return (
    <section className="tool-panel tool-panel-compact tool-panel-pinned">
      <h2>Times table</h2>
      <p>Change the grid or colouring and the page updates at once.</p>
      <div className="field-row">
        <label>
          Up to
          <select
            value={lastFactor}
            onChange={(event) => onLastFactor(Number(event.target.value))}
          >
            <option value="10">10</option>
            <option value="12">12</option>
          </select>
        </label>
        <label>
          Colouring
          <select
            value={colouring}
            onChange={(event) =>
              onColouring(event.target.value as ChartColouring)
            }
          >
            <option value="none">None</option>
            <option value="squares">Squares only</option>
            <option value="shells">Table shells</option>
            <option value="diagonals">Diagonal bands</option>
          </select>
        </label>
      </div>
      <label className="check-row">
        <input
          type="checkbox"
          checked={includeZero}
          onChange={(event) => onIncludeZero(event.target.checked)}
        />
        Include 0
      </label>
      <PrintSettings
        font={font}
        colour={colour}
        onFont={onFont}
        onColour={onColour}
      />
      <PrintActions canPrint onPrint={onPrint} />
    </section>
  );
}
