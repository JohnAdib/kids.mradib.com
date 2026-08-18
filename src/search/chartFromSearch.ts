import { composeChart } from "../charts/composeChart";
import type { ReferenceChart } from "../charts/ReferenceChart";
import { formatChartLabel } from "../pack/formatChartLabel";
import { formatChartMachineId } from "../pack/formatChartMachineId";
import { nextSequence } from "../pack/nextSequence";
import { sequenceKey } from "../pack/sequenceKey";
import { createSeededRandom } from "../rng/createSeededRandom";
import { makeShortSeed } from "../rng/makeShortSeed";
import type { ChartSearch } from "./ChartSearch";

type Store = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

export function chartFromSearch(request: ChartSearch, store: Store) {
  const factors = composeChart({
    includeZero: request.includeZero,
    lastFactor: request.lastFactor,
  });
  const sequence =
    request.sequence ??
    (request.seed
      ? 1
      : nextSequence(store, sequenceKey("chart", factors.join("-"), "all")));
  const seed =
    request.seed ??
    makeShortSeed(createSeededRandom(`${Date.now()}-chart-${sequence}`));
  const chart: ReferenceChart = {
    label: formatChartLabel(factors, sequence),
    machineId: formatChartMachineId(factors, sequence, seed),
    seed,
    sequence,
    tables: factors,
    colouring: request.colouring,
  };
  return {
    chart,
    request: {
      ...request,
      seed,
      sequence,
    },
  };
}
