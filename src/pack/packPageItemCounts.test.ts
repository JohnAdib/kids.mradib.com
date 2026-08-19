import { expect, test } from "vitest";
import { packPageItemCounts } from "./packPageItemCounts";

test("skip counting and odd one out together fill a page", () => {
  const [skip, odd] = packPageItemCounts(["skipCount", "oddOneOut"]);
  expect(skip).toBeGreaterThanOrEqual(24);
  expect(odd).toBeGreaterThanOrEqual(10);
});

test("which is more and missing number still share a page", () => {
  const [which, missing] = packPageItemCounts(["whichIsMore", "missingNumber"]);
  expect(which).toBeGreaterThanOrEqual(36);
  expect(missing).toBeGreaterThanOrEqual(27);
});

test("a lone times pop page keeps four full bands", () => {
  expect(packPageItemCounts(["timesFacts"])).toEqual([80]);
});

test("a lone arrays page has a row for each times-table fact", () => {
  expect(packPageItemCounts(["arrayDots"])).toEqual([12]);
});

test("a lone pizza page keeps eight wheels", () => {
  expect(packPageItemCounts(["wheel"])).toEqual([8]);
});
