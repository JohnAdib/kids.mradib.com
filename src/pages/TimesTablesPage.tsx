import { PracticePackTools } from "../generator/PracticePackTools";
import { SiteFooter } from "../layout/SiteFooter";
import { SiteHeader } from "../layout/SiteHeader";
import { TimesTablesSubnav } from "../layout/TimesTablesSubnav";

export function TimesTablesPage() {
  return (
    <div className="site-shell site-shell-wide">
      <div className="screen-only">
        <SiteHeader current="tables" />
      </div>
      <main>
        <section className="hero hero-compact screen-only">
          <p className="kicker">Maths · Times tables</p>
          <h1>Practice pack</h1>
          <p className="lede">
            Tick the tables, or type them in the address bar:
            <code> ?tables=1,2,3</code>
          </p>
          <TimesTablesSubnav current="pack" />
        </section>
        <PracticePackTools />
      </main>
      <div className="screen-only">
        <SiteFooter />
      </div>
    </div>
  );
}
