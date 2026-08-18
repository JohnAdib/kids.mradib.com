import { PrintsTools } from "../generator/PrintsTools";
import { SiteFooter } from "../layout/SiteFooter";
import { SiteHeader } from "../layout/SiteHeader";

export function PrintsPage() {
  return (
    <div className="site-shell screen-only">
      <SiteHeader current="prints" />
      <main>
        <section className="hero">
          <p className="kicker">Prints</p>
          <h1>What this browser has printed.</h1>
          <p className="lede">
            Saved after you print. Each one is a link back to that sheet.
          </p>
        </section>
        <PrintsTools />
      </main>
      <SiteFooter />
    </div>
  );
}
