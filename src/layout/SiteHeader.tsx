import { PrintsNavLink } from "./PrintsNavLink";

type SiteHeaderProps = {
  current: "home" | "maths" | "pack" | "chart" | "prints";
};

export function SiteHeader({ current }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="wordmark" href="/">
        Kids<span>.</span>
      </a>
      <nav className="nav-row" aria-label="Primary">
        <a href="/" aria-current={current === "home" ? "page" : undefined}>
          Home
        </a>
        <a
          href="/maths/"
          aria-current={current === "maths" ? "page" : undefined}
        >
          Maths
        </a>
        <a
          href="/maths/times-tables/"
          aria-current={current === "pack" ? "page" : undefined}
        >
          Practice pack
        </a>
        <a
          href="/maths/times-tables/charts/"
          aria-current={current === "chart" ? "page" : undefined}
        >
          Times table
        </a>
        <PrintsNavLink current={current === "prints"} />
      </nav>
    </header>
  );
}
