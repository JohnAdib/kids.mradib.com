import type { Stage } from "../facts/Stage";
import { toggleSortedNumber } from "../numbers/toggleSortedNumber";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { PrintSettings } from "./PrintSettings";

type Props = {
  tables: number[];
  stage: Stage;
  includeAnswers: boolean;
  font: PrintFont;
  colour: PrintColour;
  onTables: (tables: number[]) => void;
  onStage: (stage: Stage) => void;
  onIncludeAnswers: (value: boolean) => void;
  onFont: (font: PrintFont) => void;
  onColour: (colour: PrintColour) => void;
  onGenerate: () => void;
  onPrint: () => void;
  canPrint: boolean;
};

export function PracticeForm({
  tables,
  stage,
  includeAnswers,
  font,
  colour,
  onTables,
  onStage,
  onIncludeAnswers,
  onFont,
  onColour,
  onGenerate,
  onPrint,
  canPrint,
}: Props) {
  return (
    <section className="tool-panel tool-panel-compact">
      <h2>Practice pack</h2>
      <p>Tick the tables for this quiz. The address bar becomes the link.</p>
      <div className="table-picks">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((table) => (
          <label key={table}>
            <input
              type="checkbox"
              checked={tables.includes(table)}
              onChange={() => onTables(toggleSortedNumber(tables, table))}
            />
            {table}
          </label>
        ))}
      </div>
      <div className="field-row">
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
      <PrintSettings
        font={font}
        colour={colour}
        onFont={onFont}
        onColour={onColour}
      />
      <label className="check-row">
        <input
          type="checkbox"
          checked={includeAnswers}
          onChange={(event) => onIncludeAnswers(event.target.checked)}
        />
        Include answer sheet
      </label>
      <div className="actions">
        <button
          className="primary-button"
          type="button"
          onClick={onGenerate}
          disabled={tables.length === 0}
        >
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
