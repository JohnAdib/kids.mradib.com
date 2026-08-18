type Props = {
  title: string;
  label: string;
  itemCount?: number;
  showScore: boolean;
};

export function PageHeader({ title, label, itemCount, showScore }: Props) {
  return (
    <header className="print-header">
      <h2 className="print-page-title">{title}</h2>
      <div className="print-meta-line">
        <span className="print-brand-mark">Kids · {label}</span>
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
