export function formatTableSet(tables: number[]) {
  const sorted = [...new Set(tables)].sort((a, b) => a - b);
  if (sorted.length === 0) {
    return "2";
  }
  if (sorted.length === 1) {
    return `${sorted[0]}`;
  }
  const consecutive = sorted.every(
    (table, index) => index === 0 || table === (sorted[index - 1] ?? 0) + 1,
  );
  if (consecutive) {
    return `${sorted[0]}–${sorted[sorted.length - 1]}`;
  }
  return sorted.join(", ");
}
