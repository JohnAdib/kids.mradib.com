import { expect, test } from "vitest";
import { formatChartLabel } from "./formatChartLabel";
import { formatPackLabel } from "./formatPackLabel";
import { formatPackMachineId } from "./formatPackMachineId";
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
  expect(formatPackLabel([2], "mixed", 17)).toBe("2× Mix #17");
  expect(formatPackLabel([1, 2, 3], "multiply", 1)).toBe("1–3× M #1");
  expect(formatPackMachineId([2], "mixed", 17, "k4p9")).toBe("2-mix-17-k4p9");
  expect(formatPackMachineId([1, 2, 3], "multiply", 1, "ab12")).toBe(
    "1-2-3-m-1-ab12",
  );
  expect(formatChartLabel([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 4)).toBe(
    "Times table 1–12 #4",
  );
});

test("suggested time rounds to half minutes", () => {
  expect(suggestSeconds(20, "multiply")).toBe(180);
  expect(formatSuggestedTime(180)).toBe("3 minutes");
});
