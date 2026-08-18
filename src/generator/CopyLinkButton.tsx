export function CopyLinkButton() {
  return (
    <button
      className="ghost-button"
      type="button"
      onClick={() => void navigator.clipboard.writeText(window.location.href)}
    >
      Copy link
    </button>
  );
}
