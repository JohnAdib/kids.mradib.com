import type { Stage } from "../facts/Stage";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { PrintSettings } from "./PrintSettings";

type Props = {
  focus: number;
  stage: Stage;
  includePrior: boolean;
  includeAnswers: boolean;
  font: PrintFont;
  colour: PrintColour;
  onFocus: (focus: number) => void;
  onStage: (stage: Stage) => void;
  onIncludePrior: (value: boolean) => void;
  onIncludeAnswers: (value: boolean) => void;
  onFont: (font: PrintFont) => void;
  onColour: (colour: PrintColour) => void;
  onGenerate: () => void;
  onPrint: () => void;
  canPrint: boolean;
};

export function PracticeForm({
  focus,
  stage,
  includePrior,
  includeAnswers,
  font,
  colour,
  onFocus,
  onStage,
  onIncludePrior,
  onIncludeAnswers,
  onFont,
  onColour,
  onGenerate,
  onPrint,
  canPrint,
}: Props) {
  return (
    <section className="tool-panel">
      <h2>Practice pack</h2>
      <p>
        Four A4 pages. One activity on each page. Earlier tables stay in the mix
        unless you switch them off.
      </p>
      <div className="field-row">
        <label>
          Focus table
          <select
            value={focus}
            onChange={(event) => onFocus(Number(event.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((table) => (
              <option value={table} key={table}>
                {table} times table
              </option>
            ))}
          </select>
        </label>
        <label>
          Stage
          <select
            value={stage}
            onChange={(event) => onStage(event.target.value as Stage)}
          >
            <option value="multiply">Multiplication</option>
            <option value="divide">Division</option>
            <option value="mixed">Mixed</option>
          </select>
        </label>
      </div>
      <label className="check-row">
        <input
          type="checkbox"
          checked={includePrior}
          onChange={(event) => onIncludePrior(event.target.checked)}
        />
        Keep practising earlier tables
      </label>
      <label className="check-row">
        <input
          type="checkbox"
          checked={includeAnswers}
          onChange={(event) => onIncludeAnswers(event.target.checked)}
        />
        Include answer sheet
      </label>
      <PrintSettings
        font={font}
        colour={colour}
        onFont={onFont}
        onColour={onColour}
      />
      <div className="actions">
        <button className="primary-button" type="button" onClick={onGenerate}>
          Generate pack
        </button>
        <button
          className="ghost-button"
          type="button"
          onClick={onPrint}
          disabled={!canPrint}
        >
          Print / Save as PDF
        </button>
      </div>
    </section>
  );
}
