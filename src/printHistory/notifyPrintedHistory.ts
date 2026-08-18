export function notifyPrintedHistory() {
  window.dispatchEvent(new Event("kids-history"));
}
