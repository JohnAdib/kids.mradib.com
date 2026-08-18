import type { ReferenceChart } from "../charts/ReferenceChart";
import { PageHeader } from "./PageHeader";
import type { PrintColour } from "./PrintColour";
import type { PrintFont } from "./PrintFont";
import { PrintPage } from "./PrintPage";
import { TimesTableGrid } from "./TimesTableGrid";

type Props = {
  chart: ReferenceChart;
  font: PrintFont;
  colour: PrintColour;
};

export function PrintChart({ chart, font, colour }: Props) {
  return (
    <div
      className={`print-root is-preview print-font-${font} print-colour-${colour}`}
    >
      <PrintPage>
        <PageHeader title="Times table" showScore={false} />
        <TimesTableGrid factors={chart.tables} colouring={chart.colouring} />
      </PrintPage>
    </div>
  );
}
