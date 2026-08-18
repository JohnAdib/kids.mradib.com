type Props = {
  canPrint: boolean;
  onPrint: () => void;
};

export function PrintBar({ canPrint, onPrint }: Props) {
  return (
    <div className="print-bar">
      <p className="print-bar-copy">
        Print these pages, or save them as a PDF.
      </p>
      <button
        className="primary-button"
        type="button"
        onClick={onPrint}
        disabled={!canPrint}
      >
        Print
      </button>
    </div>
  );
}
