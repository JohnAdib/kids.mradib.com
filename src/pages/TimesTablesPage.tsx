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
          <h1>Practice pack</h1>
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
