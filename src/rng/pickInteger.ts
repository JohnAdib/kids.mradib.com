export function pickInteger(next: () => number, min: number, max: number) {
  return min + Math.floor(next() * (max - min + 1));
}
