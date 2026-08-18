export function takeDistinctBy<T>(
  items: T[],
  keysOf: (item: T) => string[],
  count: number,
) {
  const seen = new Set<string>();
  const taken: T[] = [];
  for (const item of items) {
    const keys = keysOf(item);
    if (keys.some((key) => seen.has(key))) {
      continue;
    }
    for (const key of keys) {
      seen.add(key);
    }
    taken.push(item);
    if (taken.length === count) {
      break;
    }
  }
  return taken;
}
