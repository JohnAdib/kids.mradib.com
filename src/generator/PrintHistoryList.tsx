import type { PrintedRecord } from "../printHistory/PrintedRecord";

type Props = {
  heading: string;
  empty: string;
  records: PrintedRecord[];
  onReprint: (record: PrintedRecord) => void;
};

export function PrintHistoryList({
  heading,
  empty,
  records,
  onReprint,
}: Props) {
  if (records.length === 0) {
    return (
      <section className="tool-panel">
        <h2>{heading}</h2>
        <p>{empty}</p>
      </section>
    );
  }
  return (
    <section className="tool-panel">
      <h2>{heading}</h2>
      <p>
        These stayed on this computer. Reprint the same sheet from the seed.
      </p>
      <ul className="history-list">
        {records.map((record) => (
          <li key={`${record.machineId}-${record.printedAt}`}>
            <span>
              {record.label}
              <br />
              <small>{new Date(record.printedAt).toLocaleString()}</small>
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
