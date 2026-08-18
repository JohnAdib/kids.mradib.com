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
            tables you want. The generator will sit here next.
          </p>
        </section>
        <section className="section">
          <h2>Pedagogy</h2>
          <div className="pedagogy-block">
            <p>
              Times tables are not a poem to chant and forget. They are the
              tools for almost every later bit of maths — money, time,
              fractions, long multiplication.
            </p>
            <p>
              A child is a master of a table when they can answer quickly
              without counting up, they can undo the fact (division), and they
              can still do last term’s tables while they learn the new one.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
