import type { Stage } from "../facts/Stage";
import { toggleSortedNumber } from "../numbers/toggleSortedNumber";
import type { PackChallengeId } from "../pack/PackChallengeId";
import { pageCounts } from "../pack/pageCounts";
import type { PrintColour } from "../print/PrintColour";
import type { PrintFont } from "../print/PrintFont";
import { ChallengePicks } from "./ChallengePicks";
import { CopyLinkButton } from "./CopyLinkButton";
import { MoreSettings } from "./MoreSettings";
import { PrintSettings } from "./PrintSettings";
import { StagePicks } from "./StagePicks";

type Props = {
  tables: number[];
  stage: Stage;
  pageCount: number;
  challenges: PackChallengeId[];
  includeAnswers: boolean;
  font: PrintFont;
  colour: PrintColour;
  onTables: (tables: number[]) => void;
  onStage: (stage: Stage) => void;
  onPageCount: (pageCount: number) => void;
  onChallenges: (challenges: PackChallengeId[]) => void;
  onIncludeAnswers: (value: boolean) => void;
  onFont: (font: PrintFont) => void;
  onColour: (colour: PrintColour) => void;
};

export function PracticeForm({
  tables,
  stage,
  pageCount,
  challenges,
  includeAnswers,
  font,
  colour,
  onTables,
  onStage,
  onPageCount,
  onChallenges,
  onIncludeAnswers,
  onFont,
  onColour,
}: Props) {
  return (
    <section className="tool-panel tool-panel-compact tool-panel-pinned">
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
      <StagePicks stage={stage} onChange={onStage} />
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
      <ChallengePicks challenges={challenges} onChange={onChallenges} />
      <MoreSettings>
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
        <CopyLinkButton />
      </MoreSettings>
    </section>
  );
}
