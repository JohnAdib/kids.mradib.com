import { expect, test } from "vitest";
import { createSeededRandom } from "./createSeededRandom";

test("the same seed repeats the same stream", () => {
  const first = createSeededRandom("7-mix-1-abcd");
  const second = createSeededRandom("7-mix-1-abcd");
  expect([first(), first(), first()]).toEqual([second(), second(), second()]);
});

test("different seeds diverge", () => {
  const first = createSeededRandom("aaaa");
  const second = createSeededRandom("bbbb");
  expect(first()).not.toBe(second());
});
