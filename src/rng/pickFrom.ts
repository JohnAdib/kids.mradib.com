import { pickInteger } from "./pickInteger";

export function pickFrom<T>(items: T[], next: () => number) {
  if (items.length === 0) {
    return undefined;
  }
  return items[pickInteger(next, 0, items.length - 1)];
}
