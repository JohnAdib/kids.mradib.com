import { shuffleCopy } from "../rng/shuffleCopy";

export function fillPageKinds<T>(
  items: T[],
  pageCount: number,
  next: () => number,
) {
  if (items.length === 0 || pageCount <= 0) {
    return [] as T[];
  }
  const pages: T[] = [];
  while (pages.length < pageCount) {
    for (const item of shuffleCopy(items, next)) {
      if (pages.length >= pageCount) {
        break;
      }
      pages.push(item);
    }
  }
  return pages;
}
