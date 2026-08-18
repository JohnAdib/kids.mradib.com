import { expect, test } from "vitest";
import { composePack } from "./composePack";

test("a pack is four pages and reprintable from the same seed", () => {
  const first = composePack({
    focus: 7,
    stage: "mixed",
    includePrior: true,
    seed: "k4p9",
    sequence: 17,
  });
  const second = composePack({
    focus: 7,
    stage: "mixed",
    includePrior: true,
    seed: "k4p9",
    sequence: 17,
  });
  expect(first.pages).toHaveLength(4);
  expect(first.itemCount).toBeGreaterThan(20);
  expect(first.machineId).toBe("7-mix-17-k4p9");
  expect(first.answers).toEqual(second.answers);
});
