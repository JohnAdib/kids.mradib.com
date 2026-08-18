import { PracticePackTools } from "../generator/PracticePackTools";
import { SiteFooter } from "../layout/SiteFooter";
import { SiteHeader } from "../layout/SiteHeader";

export function TimesTablesPage() {
  return (
    <div className="site-shell site-shell-wide">
      <div className="screen-only">
        <SiteHeader current="pack" />
      </div>
      <main>
        <PracticePackTools />
      </main>
      <div className="screen-only">
        <SiteFooter />
      </div>
    </div>
  );
}
