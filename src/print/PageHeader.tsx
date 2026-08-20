import { siteHost } from "../site/siteHost";

type Props = {
  title?: string;
  itemCount?: number;
  showScore: boolean;
};

export function PageHeader({ title, itemCount, showScore }: Props) {
  return (
    <header className="print-header">
      <span className="print-name">
        Name <span className="print-fill print-fill-name" />
      </span>
      <div className="print-header-centre">
        {title ? <h2 className="print-page-title">{title}</h2> : null}
        <span className="print-site">{siteHost}</span>
      </div>
      {showScore ? (
        <span className="print-meta">
          <span className="print-score">
            <span className="print-fill print-fill-score">
              <span className="print-fill-hint">{itemCount}</span>
            </span>{" "}
            / {itemCount}
          </span>
          <span className="print-record">
            Record
            <span className="print-fill print-fill-time">
              <span className="print-fill-hint">mm:ss</span>
            </span>
          </span>
        </span>
      ) : (
        <span className="print-meta" />
      )}
    </header>
  );
}
