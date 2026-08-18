import type { ChartSearch } from "./ChartSearch";

export function formatChartSearch(request: ChartSearch) {
  const params = new URLSearchParams();
  params.set("to", String(request.lastFactor));
  if (request.includeZero) {
    params.set("zero", "1");
  }
  if (request.colouring !== "squares") {
    params.set("colouring", request.colouring);
  }
  if (request.font !== "clear") {
    params.set("font", request.font);
  }
  if (request.colour !== "ink") {
    params.set("colour", request.colour);
  }
  if (request.seed) {
    params.set("seed", request.seed);
  }
  if (request.sequence !== undefined) {
    params.set("n", String(request.sequence));
  }
  return params.toString();
}
