import { expect, test } from "vitest";
import { createSeededRandom } from "./createSeededRandom";
import { takeShuffled } from "./takeShuffled";

test("reshuffles instead of cycling the same order", () => {
  const items = [1, 2, 3, 4];
  const taken = takeShuffled(items, 12, createSeededRandom("reshuffle"));
  expect(taken).toHaveLength(12);
  expect(new Set(taken.slice(0, 4)).size).toBe(4);
  expect(taken.slice(0, 4)).not.toEqual(taken.slice(4, 8));
});
