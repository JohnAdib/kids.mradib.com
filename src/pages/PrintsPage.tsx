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
            Saved after you print, not after you generate. Reprint the same
            sheet from the seed.
          </p>
        </section>
        <PrintsTools />
      </main>
      <SiteFooter />
    </div>
  );
}
