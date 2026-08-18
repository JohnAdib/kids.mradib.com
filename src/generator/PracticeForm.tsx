import type { Stage } from "../facts/Stage";
import { toggleSortedNumber } from "../numbers/toggleSortedNumber";
import type { PackChallengeId } from "../pack/PackChallengeId";
import { pageCounts } from "../pack/pageCounts";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { ChallengePicks } from "./ChallengePicks";
import { PrintActions } from "./PrintActions";
import { PrintSettings } from "./PrintSettings";

type Props = {
  tables: number[];
  stage: Stage;
  pageCount: number;
  challenges: PackChallengeId[];
  includeAnswers: boolean;
  font: PrintFont;
  colour: PrintColour;
  canPrint: boolean;
  onTables: (tables: number[]) => void;
  onStage: (stage: Stage) => void;
  onPageCount: (pageCount: number) => void;
  onChallenges: (challenges: PackChallengeId[]) => void;
  onIncludeAnswers: (value: boolean) => void;
  onFont: (font: PrintFont) => void;
  onColour: (colour: PrintColour) => void;
  onPrint: () => void;
};

export function PracticeForm({
  tables,
  stage,
  pageCount,
  challenges,
  includeAnswers,
  font,
  colour,
  canPrint,
  onTables,
  onStage,
  onPageCount,
  onChallenges,
  onIncludeAnswers,
  onFont,
  onColour,
  onPrint,
}: Props) {
  return (
    <section className="tool-panel tool-panel-compact tool-panel-pinned">
      <h2>Practice pack</h2>
      <p>
        {canPrint
          ? "Change a setting and the pages update at once."
          : "Tick the tables to quiz. Pages appear as soon as you pick one."}
      </p>
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
        <label>
          Pages
          <select
            value={pageCount}
            onChange={(event) => onPageCount(Number(event.target.value))}
          >
            {pageCounts.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </label>
      </div>
      <ChallengePicks challenges={challenges} onChange={onChallenges} />
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
      <PrintActions canPrint={canPrint} onPrint={onPrint} />
    </section>
  );
}
