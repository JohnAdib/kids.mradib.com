import { expect, test } from "vitest";
import { createSeededRandom } from "../rng/createSeededRandom";
import { packPageCombos } from "./packPageCombos";

test("an empty list stays empty", () => {
  expect(packPageCombos(["wheel"], 0, () => 0.5)).toEqual([]);
  expect(packPageCombos([], 4, () => 0.5)).toEqual([]);
});

test("one chosen challenge keeps a page to itself", () => {
  const pages = packPageCombos(["timesFacts"], 3, createSeededRandom("solo"));
  expect(pages).toEqual([["timesFacts"], ["timesFacts"], ["timesFacts"]]);
});

test("two shareable challenges sit together on a page", () => {
  const pages = packPageCombos(
    ["wheel", "skipCount"],
    4,
    createSeededRandom("pair"),
  );
  expect(pages).toHaveLength(4);
  for (const page of pages) {
    expect(page).toHaveLength(2);
  }
  expect(new Set(pages.flat())).toEqual(new Set(["wheel", "skipCount"]));
});

test("a colour hunt keeps the whole page", () => {
  const pages = packPageCombos(
    ["colourMultiples", "wheel"],
    4,
    createSeededRandom("grid"),
  );
  expect(pages).toHaveLength(4);
  for (const page of pages) {
    if (page[0] === "colourMultiples") {
      expect(page).toHaveLength(1);
    }
  }
});

test("the same seed fills the same pages", () => {
  const first = packPageCombos(
    ["wheel", "oddOneOut"],
    6,
    createSeededRandom("k"),
  );
  const second = packPageCombos(
    ["wheel", "oddOneOut"],
    6,
    createSeededRandom("k"),
  );
  expect(first).toEqual(second);
});
