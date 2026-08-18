import { TimesTablesTools } from "../generator/TimesTablesTools";
import { SiteFooter } from "../layout/SiteFooter";
import { SiteHeader } from "../layout/SiteHeader";

export function TimesTablesPage() {
  return (
    <div className="site-shell screen-only">
      <SiteHeader current="tables" />
      <main>
        <section className="hero">
          <p className="kicker">Maths · Times tables</p>
          <h1>Print the practice. Keep the old facts alive.</h1>
          <p className="lede">
            Two tools: a four-page mixed pack, and a fridge chart of only the
            tables you want. Write a name at the top, time the work, then mark
            how many were true.
          </p>
        </section>
        <TimesTablesTools />
      </main>
      <SiteFooter />
    </div>
  );
}
