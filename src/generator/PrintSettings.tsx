import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";

type Props = {
  font: PrintFont;
  colour: PrintColour;
  onFont: (font: PrintFont) => void;
  onColour: (colour: PrintColour) => void;
};

export function PrintSettings({ font, colour, onFont, onColour }: Props) {
  return (
    <div className="field-row">
      <label>
        Print font
        <select
          value={font}
          onChange={(event) => onFont(event.target.value as PrintFont)}
        >
          <option value="clear">Clear</option>
          <option value="handwriting">Handwriting</option>
          <option value="mono">Mono</option>
        </select>
      </label>
      <label>
        Print colour
        <select
          value={colour}
          onChange={(event) => onColour(event.target.value as PrintColour)}
        >
          <option value="ink">Ink saver</option>
          <option value="colour">Colour</option>
        </select>
      </label>
    </div>
  );
}
