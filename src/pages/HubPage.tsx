import { SiteFooter } from "../layout/SiteFooter";
import { SiteHeader } from "../layout/SiteHeader";

export function HubPage() {
  return (
    <div className="site-shell screen-only">
      <SiteHeader current="home" />
      <main>
        <section className="hero">
          <p className="kicker">Home practice</p>
          <h1>School facts, on paper, until they stick.</h1>
          <p className="lede">
            I made this for my daughters, to print times tables until they
            stick. If it helps at your table too, use it. We start with maths.
          </p>
        </section>
        <div className="card-grid">
          <a className="pastel-card mint" href="/maths/">
            <span className="chip">Subject</span>
            <h2>Maths</h2>
            <p>Times tables and division first. Other topics later.</p>
          </a>
          <a className="pastel-card peach" href="/maths/times-tables/">
            <span className="chip">Ready now</span>
            <h2>Times tables</h2>
            <p>Four A4 practice pages, and a fridge chart next door.</p>
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
