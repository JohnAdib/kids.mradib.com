import { sortedUniqueNumbers } from "../numbers/sortedUniqueNumbers";

export function parseTablesParam(value: string) {
  const tables: number[] = [];
  for (const part of value.split(",")) {
    const trimmed = part.trim();
    if (trimmed.length === 0) {
      continue;
    }
    const bits = trimmed.split("-").map((bit) => Number(bit));
    if (bits.some((bit) => !Number.isInteger(bit))) {
      continue;
    }
    if (bits.length === 2) {
      const from = bits[0] ?? 0;
      const to = bits[1] ?? 0;
      const start = Math.min(from, to);
      const end = Math.max(from, to);
      for (let table = start; table <= end; table += 1) {
        tables.push(table);
      }
      continue;
    }
    tables.push(...bits);
  }
  return sortedUniqueNumbers(tables).filter(
    (table) => table >= 0 && table <= 12,
  );
}
