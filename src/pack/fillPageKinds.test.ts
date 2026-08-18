import { expect, test } from "vitest";
import { createSeededRandom } from "../rng/createSeededRandom";
import { fillPageKinds } from "./fillPageKinds";

test("an empty list stays empty", () => {
  expect(fillPageKinds(["wheel"], 0, () => 0.5)).toEqual([]);
  expect(fillPageKinds([], 4, () => 0.5)).toEqual([]);
});

test("one page picks one of the chosen kinds", () => {
  const pages = fillPageKinds(
    ["wheel", "matchLines"],
    1,
    createSeededRandom("one"),
  );
  expect(pages).toHaveLength(1);
  expect(["wheel", "matchLines"]).toContain(pages[0]);
});

test("ten pages cycle the mix and can repeat", () => {
  const pages = fillPageKinds(
    ["wheel", "matchLines"],
    10,
    createSeededRandom("ten"),
  );
  expect(pages).toHaveLength(10);
  expect(new Set(pages)).toEqual(new Set(["wheel", "matchLines"]));
  expect(pages.filter((kind) => kind === "wheel").length).toBe(5);
  expect(pages.filter((kind) => kind === "matchLines").length).toBe(5);
});

test("the same seed fills the same pages", () => {
  const first = fillPageKinds(
    ["wheel", "oddOneOut"],
    6,
    createSeededRandom("k"),
  );
  const second = fillPageKinds(
    ["wheel", "oddOneOut"],
    6,
    createSeededRandom("k"),
  );
  expect(first).toEqual(second);
});
