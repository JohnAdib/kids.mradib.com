export function sortedUniqueNumbers(values: number[]) {
  return [...new Set(values)].sort((a, b) => a - b);
}
