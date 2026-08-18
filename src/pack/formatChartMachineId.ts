export function formatChartMachineId(
  tables: number[],
  sequence: number,
  seed: string,
) {
  return `chart-${tables.join("-")}-${sequence}-${seed}`;
}
