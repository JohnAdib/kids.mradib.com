import { expect, test } from "vitest";
import { formatChartLabel } from "./formatChartLabel";
import { formatPackMachineId } from "./formatPackMachineId";
import { formatPackLabel } from "./formatPackLabel";
import { formatSuggestedTime } from "./formatSuggestedTime";
import { nextSequence } from "./nextSequence";
import { suggestSeconds } from "./suggestSeconds";

test("sequence numbers climb on a store", () => {
  const store = new Map<string, string>();
  const adapter = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
  };
  expect(nextSequence(adapter, "kids.seq.pack.2.mix")).toBe(1);
  expect(nextSequence(adapter, "kids.seq.pack.2.mix")).toBe(2);
});

test("pack ids stay readable and reprintable", () => {
  expect(formatPackLabel(2, "mixed", 17)).toBe("2× Mix #17");
  expect(formatPackMachineId(2, "mixed", 17, "k4p9")).toBe("2-mix-17-k4p9");
  expect(formatChartLabel([2, 3, 5, 10], 4)).toBe("Chart 2, 3, 5, 10 #4");
});

test("suggested time rounds to half minutes", () => {
  expect(suggestSeconds(20, "multiply")).toBe(180);
  expect(formatSuggestedTime(180)).toBe("3 minutes");
});
