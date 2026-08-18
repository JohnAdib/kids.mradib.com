import { expect, test } from "vitest";
import { formatChartSearch } from "./formatChartSearch";
import { parseChartSearch } from "./parseChartSearch";

test("a typed to= is a chart request", () => {
  expect(parseChartSearch("to=10")).toEqual({
    lastFactor: 10,
    includeZero: false,
    colouring: "squares",
    font: "clear",
    colour: "ink",
    seed: undefined,
    sequence: undefined,
  });
});

test("round trips a generated chart link", () => {
  const search = formatChartSearch({
    lastFactor: 12,
    includeZero: true,
    colouring: "shells",
    font: "mono",
    colour: "colour",
    seed: "ab12",
    sequence: 2,
  });
  expect(search).toBe(
    "to=12&zero=1&colouring=shells&font=mono&colour=colour&seed=ab12&n=2",
  );
  expect(parseChartSearch(search)?.colouring).toBe("shells");
});
