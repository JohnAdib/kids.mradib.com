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
          <p className="kicker">Maths · Times table</p>
          <h1>Times table</h1>
          <p className="lede">
            One A4 square, or type <code>?to=10</code> in the address bar.
          </p>
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
