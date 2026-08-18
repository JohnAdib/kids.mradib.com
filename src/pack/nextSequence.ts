type SequenceStore = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

export function nextSequence(store: SequenceStore, key: string) {
  const current = Number(store.getItem(key) ?? "0");
  const next = Number.isFinite(current) ? current + 1 : 1;
  store.setItem(key, String(next));
  return next;
}
