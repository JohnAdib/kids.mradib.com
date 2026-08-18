type Input = {
  includeZero: boolean;
  lastFactor: number;
};

export function composeChart({ includeZero, lastFactor }: Input) {
  const start = includeZero ? 0 : 1;
  return Array.from({ length: lastFactor - start + 1 }, (_, i) => start + i);
}
