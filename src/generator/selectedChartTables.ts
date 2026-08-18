import { ukYearTables } from "../curriculum/ukYearTables";

export function selectedChartTables(
  year: keyof typeof ukYearTables | "custom",
  customTables: number[],
  includeZeroAndOne: boolean,
) {
  const base = year === "custom" ? customTables : [...ukYearTables[year]];
  const set = new Set(base);
  if (includeZeroAndOne) {
    set.add(0);
    set.add(1);
  }
  return [...set].sort((a, b) => a - b);
}
