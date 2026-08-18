type Props = {
  label: string;
  onPrint: () => void;
};

export function PrintPreviewBar({ label, onPrint }: Props) {
  return (
    <div className="screen-only print-toolbar">
      <p>{label}</p>
      <button className="primary-button" type="button" onClick={onPrint}>
        Print / Save as PDF
      </button>
    </div>
  );
}
