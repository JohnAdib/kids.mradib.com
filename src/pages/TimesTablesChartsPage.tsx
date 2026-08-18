import { ChartTools } from "../generator/ChartTools";
import { SiteFooter } from "../layout/SiteFooter";
import { SiteHeader } from "../layout/SiteHeader";
import { TimesTablesSubnav } from "../layout/TimesTablesSubnav";

export function TimesTablesChartsPage() {
  return (
    <div className="site-shell screen-only">
      <SiteHeader current="tables" />
      <main>
        <section className="hero hero-compact">
          <p className="kicker">Maths · Times table</p>
          <h1>Times table</h1>
          <p className="lede">
            One A4 multiplication square. Switch the colouring if you like.
          </p>
          <TimesTablesSubnav current="chart" />
        </section>
        <ChartTools />
      </main>
      <SiteFooter />
    </div>
  );
}
