import { ChartTools } from "../generator/ChartTools";
import { SiteFooter } from "../layout/SiteFooter";
import { SiteHeader } from "../layout/SiteHeader";
import { TimesTablesSubnav } from "../layout/TimesTablesSubnav";

export function TimesTablesChartsPage() {
  return (
    <div className="site-shell site-shell-wide">
      <div className="screen-only">
        <SiteHeader current="tables" />
      </div>
      <main>
        <section className="hero hero-compact screen-only">
          <h1>Times table</h1>
          <TimesTablesSubnav current="chart" />
        </section>
        <ChartTools />
      </main>
      <div className="screen-only">
        <SiteFooter />
      </div>
    </div>
  );
}
