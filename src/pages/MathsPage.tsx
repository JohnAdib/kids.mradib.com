import { SiteFooter } from "../layout/SiteFooter";
import { SiteHeader } from "../layout/SiteHeader";

export function MathsPage() {
  return (
    <div className="site-shell screen-only">
      <SiteHeader current="maths" />
      <main>
        <section className="hero">
          <p className="kicker">Maths</p>
          <h1>The tables first. Everything else leans on them.</h1>
          <p className="lede">
            Money, time, fractions, and long multiplication all wait on these
            facts. We print them, mix them, and keep last term’s tables alive
            while a new one is learned.
          </p>
        </section>
        <div className="card-grid">
          <a className="pastel-card sky" href="/maths/times-tables/">
            <span className="chip">Practice</span>
            <h2>Practice pack</h2>
            <p>
              Four A4 pages. One activity on each page. Multiplication, then
              division, then mixed.
            </p>
          </a>
          <a className="pastel-card butter" href="/maths/times-tables/charts/">
            <span className="chip">Table</span>
            <h2>Times table</h2>
            <p>
              One A4 multiplication square. Plain, squares, shells, or diagonal
              bands.
            </p>
          </a>
        </div>
        <section className="section">
          <h2>How we teach</h2>
          <div className="pedagogy-block">
            <p>
              The pedagogy is the same wherever you are. A child has mastered a
              table when three things are true: they can answer quickly without
              counting up, they can undo the fact (division), and they can still
              do last term’s tables while they learn the new one.
            </p>
            <p>
              That is why a 7 pack is not 7-only. It is a lot of 7, and a lot of
              2, 3, 4, 5, 6, 8 and 10, on the same four pages.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
