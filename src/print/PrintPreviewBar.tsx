type Props = {
  label: string;
  onPrint: () => void;
};

export function PrintPreviewBar({ label, onPrint }: Props) {
  return (
    <div className="screen-only print-toolbar">
      <p>{label}</p>
      <div className="print-toolbar-actions">
        <button
          className="ghost-button"
          type="button"
          onClick={() =>
            void navigator.clipboard.writeText(window.location.href)
          }
        >
          Copy link
        </button>
        <button className="primary-button" type="button" onClick={onPrint}>
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
}
