export function takeAscendingOutside(
  excluded: Iterable<number>,
  count: number,
  start = 1,
) {
  const blocked = new Set(excluded);
  const found: number[] = [];
  let candidate = start;
  while (found.length < count) {
    if (!blocked.has(candidate)) {
      found.push(candidate);
    }
    candidate += 1;
  }
  return found;
}
