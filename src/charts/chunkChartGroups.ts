import type { ChartGroup } from "./ChartGroup";

export function chunkChartGroups(groups: ChartGroup[], size: number) {
  const pages: ChartGroup[][] = [];
  for (let i = 0; i < groups.length; i += size) {
    pages.push(groups.slice(i, i + size));
  }
  return pages.length > 0 ? pages : [[]];
}
