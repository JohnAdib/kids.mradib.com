import type { ChartGroup } from "../charts/ChartGroup";
import type { ReferenceChart } from "../charts/ReferenceChart";
import type { PrintColour } from "./PrintColour";
import type { PrintFont } from "./PrintFont";
import { PageHeader } from "./PageHeader";

type Props = {
  chart: ReferenceChart;
  groups: ChartGroup[];
  font: PrintFont;
  colour: PrintColour;
};

export function PrintChart({ chart, groups, font, colour }: Props) {
  return (
    <div
      className={`print-root is-preview print-font-${font} print-colour-${colour}`}
    >
      <article className="print-page">
        <PageHeader
          brand="Kids"
          label={chart.label}
          machineId={chart.machineId}
          showScore={false}
        />
        <div className="chart-grid">
          {groups.map((group) => (
            <section className="family-card" key={group.table}>
              <h3 className="exercise-title">{group.table} times table</h3>
              {group.rows.map((row) => (
                <p key={row.expression}>
                  {row.expression}
                  {row.inverse ? ` · ${row.inverse}` : ""}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
