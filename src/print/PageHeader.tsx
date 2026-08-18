import { siteHost } from "../site/siteHost";

type Props = {
  title: string;
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
        <h2 className="print-page-title">{title}</h2>
        <span className="print-site">{siteHost}</span>
      </div>
      {showScore ? (
        <span className="print-score">
          <span className="print-fill print-fill-score" /> / {itemCount}
        </span>
      ) : (
        <span className="print-score" />
      )}
    </header>
  );
}
