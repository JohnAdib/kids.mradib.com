import { expect, test } from "vitest";
import { composePack } from "./composePack";

test("a pack is four pages and reprintable from the same seed", () => {
  const first = composePack({
    tables: [7],
    stage: "mixed",
    seed: "k4p9",
    sequence: 17,
  });
  const second = composePack({
    tables: [7],
    stage: "mixed",
    seed: "k4p9",
    sequence: 17,
  });
  expect(first.pages).toHaveLength(4);
  expect(first.itemCount).toBeGreaterThan(20);
  expect(first.machineId).toBe("7-mix-17-k4p9");
  expect(first.answers).toEqual(second.answers);
});

test("each page is one activity, never a true-or-false quiz", () => {
  const pack = composePack({
    tables: [2],
    stage: "multiply",
    seed: "a4",
    sequence: 1,
  });
  expect(pack.pages).toHaveLength(4);
  for (const page of pack.pages) {
    expect(page.exercises).toHaveLength(1);
  }
  const types = pack.pages.flatMap((page) =>
    page.exercises.map((exercise) => exercise.type),
  );
  expect(types).not.toContain("trueFalse");
  expect(types).not.toContain("whichIsMore");
});

test("a 1, 2 and 3 pack is labelled as that quiz", () => {
  const pack = composePack({
    tables: [3, 1, 2],
    stage: "multiply",
    seed: "quiz",
    sequence: 4,
  });
  expect(pack.tables).toEqual([1, 2, 3]);
  expect(pack.label).toBe("1–3× M #4");
});

test("every table and stage finishes", () => {
  const stages = ["multiply", "divide", "mixed"] as const;
  for (const table of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
    for (const stage of stages) {
      const pack = composePack({
        tables: [table],
        stage,
        seed: `f${table}-${stage}`,
        sequence: 1,
      });
      expect(pack.pages).toHaveLength(4);
    }
  }
});
