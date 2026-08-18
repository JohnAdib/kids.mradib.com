import type { ChartColouring } from "../charts/ChartColouring";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { CopyLinkButton } from "./CopyLinkButton";
import { MoreSettings } from "./MoreSettings";
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
}: Props) {
  return (
    <section className="tool-panel tool-panel-compact tool-panel-pinned">
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
          Grid
          <select
            value={colouring}
            onChange={(event) =>
              onColouring(event.target.value as ChartColouring)
            }
          >
            <option value="none">Filled</option>
            <option value="blank">Empty to fill in</option>
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
      <MoreSettings>
        <PrintSettings
          font={font}
          colour={colour}
          onFont={onFont}
          onColour={onColour}
        />
        <CopyLinkButton />
      </MoreSettings>
    </section>
  );
}
