import type { PrintedRecord } from "../printHistory/PrintedRecord";
import { printedRecordHref } from "../search/printedRecordHref";

type Props = {
  heading: string;
  empty: string;
  records: PrintedRecord[];
};

export function PrintHistoryList({ heading, empty, records }: Props) {
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
      <p>Each one is a link. Open it to get the same sheet again.</p>
      <ul className="history-list">
        {records.map((record) => (
          <li key={`${record.machineId}-${record.printedAt}`}>
            <span>
              {record.label}
              <br />
              <small>{new Date(record.printedAt).toLocaleString()}</small>
            </span>
            <a className="ghost-button" href={printedRecordHref(record)}>
              Open
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
