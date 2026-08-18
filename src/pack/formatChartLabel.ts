export function formatChartLabel(tables: number[], sequence: number) {
  return `Chart ${tables.join(", ")} #${sequence}`;
}
