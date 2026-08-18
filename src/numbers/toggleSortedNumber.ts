export function toggleSortedNumber(current: number[], table: number) {
  if (current.includes(table)) {
    return current.filter((item) => item !== table);
  }
  return [...current, table].sort((a, b) => a - b);
}
