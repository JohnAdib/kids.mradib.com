import type { ChartSearch } from "./ChartSearch";
import { formatChartSearch } from "./formatChartSearch";

export function chartPageHref(request: ChartSearch) {
  return `/maths/times-tables/charts/?${formatChartSearch(request)}`;
}
