import type { PrintedRecord } from "../printHistory/PrintedRecord";

type Props = {
  records: PrintedRecord[];
  onReprint: (record: PrintedRecord) => void;
};

export function PrintHistoryList({ records, onReprint }: Props) {
  if (records.length === 0) {
    return (
      <section className="tool-panel">
        <h2>Print history</h2>
        <p>Nothing printed yet on this browser. History is saved after you print.</p>
      </section>
    );
  }
  return (
    <section className="tool-panel">
      <h2>Print history</h2>
      <p>These stayed on this computer. Reprint the same sheet from the seed.</p>
      <ul className="history-list">
        {records.map((record) => (
          <li key={`${record.machineId}-${record.printedAt}`}>
            <span>
              {record.label}
              <br />
              <small>
                {record.kind} · {new Date(record.printedAt).toLocaleString("en-GB")}
              </small>
            </span>
            <button
              className="ghost-button"
              type="button"
              onClick={() => onReprint(record)}
            >
              Reprint
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
