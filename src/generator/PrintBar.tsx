type Props = {
  canPrint: boolean;
  onPrint: () => void;
  onNewSheet?: () => void;
};

export function PrintBar({ canPrint, onPrint, onNewSheet }: Props) {
  return (
    <div className="page-heading-actions">
      {onNewSheet ? (
        <button
          className="ghost-button"
          type="button"
          onClick={onNewSheet}
          disabled={!canPrint}
        >
          New sheet
        </button>
      ) : null}
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
