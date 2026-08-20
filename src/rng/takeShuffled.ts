import { shuffleCopy } from "./shuffleCopy";

export function takeShuffled<T>(items: T[], count: number, next: () => number) {
  if (items.length === 0 || count <= 0) {
    return [] as T[];
  }
  const taken: T[] = [];
  let bag: T[] = [];
  for (let i = 0; i < count; i += 1) {
    if (bag.length === 0) {
      bag = shuffleCopy(items, next);
    }
    const item = bag.shift();
    if (item !== undefined) {
      taken.push(item);
    }
  }
  return taken;
}
