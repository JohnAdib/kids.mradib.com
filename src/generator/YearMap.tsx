import { ukYearTables } from "../curriculum/ukYearTables";

export function YearMap() {
  return (
    <section className="section">
      <h2>Year map</h2>
      <p className="lede">
        This is how UK primary usually meets the tables. Use it as a guide, not
        a gate.
      </p>
      <ul className="year-list">
        <li>
          <strong>Year 2</strong> — {ukYearTables[2].join(", ")} times tables
        </li>
        <li>
          <strong>Year 3</strong> — adds 3 and 4
        </li>
        <li>
          <strong>Year 4</strong> — adds 6 and 8
        </li>
        <li>
          <strong>Year 5</strong> — adds 7 and 9
        </li>
        <li>
          <strong>Year 6</strong> — adds 11 and 12
        </li>
      </ul>
    </section>
  );
}
