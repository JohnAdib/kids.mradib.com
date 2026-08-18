import type { ukYearTables } from "../curriculum/ukYearTables";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { PrintSettings } from "./PrintSettings";

type Props = {
  year: keyof typeof ukYearTables | "custom";
  tables: number[];
  includeZeroAndOne: boolean;
  includeInverses: boolean;
  font: PrintFont;
  colour: PrintColour;
  onYear: (year: keyof typeof ukYearTables | "custom") => void;
  onToggleTable: (table: number) => void;
  onIncludeZeroAndOne: (value: boolean) => void;
  onIncludeInverses: (value: boolean) => void;
  onFont: (font: PrintFont) => void;
  onColour: (colour: PrintColour) => void;
  onGenerate: () => void;
  onPrint: () => void;
  canPrint: boolean;
};

export function ChartForm({
  year,
  tables,
  includeZeroAndOne,
  includeInverses,
  font,
  colour,
  onYear,
  onToggleTable,
  onIncludeZeroAndOne,
  onIncludeInverses,
  onFont,
  onColour,
  onGenerate,
  onPrint,
  canPrint,
}: Props) {
  return (
    <section className="tool-panel">
      <h2>Reference chart</h2>
      <p>
        A fridge sheet of the tables you choose. Not practice, and not a test —
        just the facts to keep nearby.
      </p>
      <div className="field-row">
        <label>
          Year map
          <select
            value={year}
            onChange={(event) =>
              onYear(
                event.target.value === "custom"
                  ? "custom"
                  : (Number(event.target.value) as keyof typeof ukYearTables),
              )
            }
          >
            <option value="2">Year 2 — 2, 5, 10</option>
            <option value="3">Year 3 — add 3 and 4</option>
            <option value="4">Year 4 — add 6 and 8</option>
            <option value="5">Year 5 — add 7 and 9</option>
            <option value="6">Year 6 — add 11 and 12</option>
            <option value="custom">Custom set</option>
          </select>
        </label>
      </div>
      <div className="table-picks">
        {Array.from({ length: 11 }, (_, i) => i + 2).map((table) => (
          <label key={table}>
            <input
              type="checkbox"
              checked={tables.includes(table)}
              onChange={() => onToggleTable(table)}
            />
            {table}
          </label>
        ))}
      </div>
      <label className="check-row">
        <input
          type="checkbox"
          checked={includeZeroAndOne}
          onChange={(event) => onIncludeZeroAndOne(event.target.checked)}
        />
        Always include 0 and 1
      </label>
      <label className="check-row">
        <input
          type="checkbox"
          checked={includeInverses}
          onChange={(event) => onIncludeInverses(event.target.checked)}
        />
        Show division next to each fact
      </label>
      <PrintSettings
        font={font}
        colour={colour}
        onFont={onFont}
        onColour={onColour}
      />
      <div className="actions">
        <button className="primary-button" type="button" onClick={onGenerate}>
          Generate chart
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
