type Props = {
  canPrint: boolean;
  onPrint: () => void;
};

export function PrintActions({ canPrint, onPrint }: Props) {
  return (
    <div className="actions">
      <button
        className="primary-button"
        type="button"
        onClick={onPrint}
        disabled={!canPrint}
      >
        Print / Save as PDF
      </button>
      <button
        className="ghost-button"
        type="button"
        disabled={!canPrint}
        onClick={() => void navigator.clipboard.writeText(window.location.href)}
      >
        Copy link
      </button>
    </div>
  );
}
