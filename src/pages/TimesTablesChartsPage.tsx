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
          <p className="kicker">Maths · Times table</p>
          <h1>The square, on one A4 page.</h1>
          <p className="lede">
            A multiplication table. Row times column. Switch the colouring if
            you want the squares, the shells, or a plain grid.
          </p>
          <TimesTablesSubnav current="chart" />
        </section>
        <ChartTools />
      </main>
      <SiteFooter />
    </div>
  );
}
