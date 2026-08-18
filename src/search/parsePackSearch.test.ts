import { expect, test } from "vitest";
import { formatPackSearch } from "./formatPackSearch";
import { parsePackSearch } from "./parsePackSearch";

test("a typed tables list is a pack request", () => {
  expect(parsePackSearch("tables=1-3")).toEqual({
    tables: [1, 2, 3],
    stage: "multiply",
    font: "clear",
    colour: "ink",
    includeAnswers: false,
    seed: undefined,
    sequence: undefined,
  });
});

test("round trips a generated pack link", () => {
  const search = formatPackSearch({
    tables: [1, 2, 3],
    stage: "mixed",
    font: "handwriting",
    colour: "colour",
    includeAnswers: true,
    seed: "k4p9",
    sequence: 4,
  });
  expect(search).toBe(
    "tables=1-3&stage=mixed&font=handwriting&colour=colour&answers=1&seed=k4p9&n=4",
  );
  expect(parsePackSearch(search)?.seed).toBe("k4p9");
});

test("a URL without tables is not a pack request", () => {
  expect(parsePackSearch("stage=mixed")).toBeNull();
});
