type Props = {
  brand: string;
  label: string;
  itemCount?: number;
  showScore: boolean;
};

export function PageHeader({ brand, label, itemCount, showScore }: Props) {
  return (
    <header className="print-header">
      <div className="print-meta-line">
        <span className="print-brand-mark">{brand}</span>
        <span className="print-pack-label">{label}</span>
        <span className="print-name">
          Name{" "}
          <span className="print-line print-line-name">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </span>
        {showScore ? (
          <span className="print-score">
            <span className="print-line print-line-score">
              &nbsp;&nbsp;&nbsp;&nbsp;
            </span>{" "}
            / {itemCount}
          </span>
        ) : null}
      </div>
    </header>
  );
}
