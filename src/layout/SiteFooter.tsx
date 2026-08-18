export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="site-footer-brand">Kids</p>
      <p>
        Printable maths practice as an A4 PDF. Tick the tables, pick the
        challenges, and print a fresh sheet whenever you need one.
      </p>
      <nav className="site-footer-nav" aria-label="Footer">
        <a href="/maths/times-tables/">Practice pack</a>
        <a href="/maths/times-tables/charts/">Times table</a>
        <a href="https://github.com/JohnAdib/kids.mradib.com">
          Source on GitHub
        </a>
      </nav>
    </footer>
  );
}
