import { formatSuggestedTime } from "../pack/formatSuggestedTime";

type Props = {
  brand: string;
  label: string;
  machineId: string;
  suggestedSeconds?: number;
  itemCount?: number;
  showScore: boolean;
};

export function PageHeader({
  brand,
  label,
  machineId,
  suggestedSeconds,
  itemCount,
  showScore,
}: Props) {
  return (
    <header className="print-header">
      <div className="print-brand">
        <span>{brand}</span>
        <span>
          {label} · {machineId}
        </span>
      </div>
      <div className="print-meta">
        <span>
          Name:{" "}
          <span className="print-line">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </span>
        {showScore ? (
          <span>Score: Correct ______ Incorrect ______ / {itemCount}</span>
        ) : (
          <span>Keep this chart nearby.</span>
        )}
        {showScore && suggestedSeconds !== undefined ? (
          <span>Suggested time: {formatSuggestedTime(suggestedSeconds)}</span>
        ) : null}
        {showScore ? (
          <span>
            Time taken:{" "}
            <span className="print-line">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </span>
        ) : null}
      </div>
    </header>
  );
}
