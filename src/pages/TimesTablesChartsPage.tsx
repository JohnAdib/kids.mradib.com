import { ChartTools } from "../generator/ChartTools";
import { SiteFooter } from "../layout/SiteFooter";
import { SiteHeader } from "../layout/SiteHeader";

export function TimesTablesChartsPage() {
  return (
    <div className="site-shell site-shell-wide">
      <div className="screen-only">
        <SiteHeader current="chart" />
      </div>
      <main>
        <ChartTools />
      </main>
      <div className="screen-only">
        <SiteFooter />
      </div>
    </div>
  );
}
