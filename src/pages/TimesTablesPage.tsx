import { PracticePackTools } from "../generator/PracticePackTools";
import { SiteFooter } from "../layout/SiteFooter";
import { SiteHeader } from "../layout/SiteHeader";
import { TimesTablesSubnav } from "../layout/TimesTablesSubnav";

export function TimesTablesPage() {
  return (
    <div className="site-shell screen-only">
      <SiteHeader current="tables" />
      <main>
        <section className="hero">
          <p className="kicker">Maths · Times tables</p>
          <h1>Four A4 pages of practice.</h1>
          <p className="lede">
            Fill in the blanks. Name at the top, a suggested time, and a score
            box for afterwards. The times table is a separate page.
          </p>
          <TimesTablesSubnav current="pack" />
        </section>
        <PracticePackTools />
      </main>
      <SiteFooter />
    </div>
  );
}
