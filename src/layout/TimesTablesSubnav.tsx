type Props = {
  current: "pack" | "chart";
};

export function TimesTablesSubnav({ current }: Props) {
  return (
    <nav className="subnav" aria-label="Times tables">
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
        Reference chart
      </a>
    </nav>
  );
}
