import { ChartTools } from "../generator/ChartTools";
import { SiteFooter } from "../layout/SiteFooter";
import { SiteHeader } from "../layout/SiteHeader";
import { TimesTablesSubnav } from "../layout/TimesTablesSubnav";

export function TimesTablesChartsPage() {
  return (
    <div className="site-shell screen-only">
      <SiteHeader current="tables" />
      <main>
        <section className="hero">
          <p className="kicker">Maths · Times tables · Chart</p>
          <h1>The facts, on the fridge.</h1>
          <p className="lede">
            A reference sheet of only the tables you want. Not a worksheet, and
            not a test.
          </p>
          <TimesTablesSubnav current="chart" />
        </section>
        <ChartTools />
      </main>
      <SiteFooter />
    </div>
  );
}
