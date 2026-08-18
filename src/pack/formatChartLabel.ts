export function formatChartLabel(factors: number[], sequence: number) {
  const first = factors[0] ?? 1;
  const last = factors[factors.length - 1] ?? 12;
  return `Times table ${first}–${last} #${sequence}`;
}
