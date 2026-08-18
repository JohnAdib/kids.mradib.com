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

test("each page has work on it, never a true-or-false quiz", () => {
  const pack = composePack({
    tables: [2],
    stage: "multiply",
    seed: "a4",
    sequence: 1,
  });
  expect(pack.pages).toHaveLength(4);
  for (const page of pack.pages) {
    expect(page.exercises.length).toBeGreaterThanOrEqual(1);
  }
  const types = pack.pages.flatMap((page) =>
    page.exercises.map((exercise) => exercise.type),
  );
  expect(types).not.toContain("trueFalse");
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

test("times pop can fill a whole pack", () => {
  const pack = composePack({
    tables: [3],
    stage: "multiply",
    seed: "pop",
    sequence: 1,
    pageCount: 1,
    challenges: ["timesFacts"],
  });
  const exercise = pack.pages[0]?.exercises[0];
  expect(exercise?.type).toBe("timesFacts");
  if (exercise?.type === "timesFacts") {
    expect(exercise.items).toHaveLength(80);
  }
});

test("ten pizza wheels is ten pages of that challenge", () => {
  const pack = composePack({
    tables: [4],
    stage: "multiply",
    seed: "wheels",
    sequence: 1,
    pageCount: 10,
    challenges: ["wheel"],
  });
  expect(pack.pages).toHaveLength(10);
  expect(pack.pages.map((page) => page.exercises[0]?.type)).toEqual(
    Array(10).fill("wheel"),
  );
  const first = pack.pages[0]?.exercises[0];
  if (first?.type === "wheel") {
    expect(first.wheels).toHaveLength(6);
  }
});

test("a mix of two compact challenges can share a page", () => {
  const pack = composePack({
    tables: [5],
    stage: "mixed",
    seed: "mix6",
    sequence: 2,
    pageCount: 6,
    challenges: ["missingNumber", "skipCount"],
  });
  expect(pack.pages).toHaveLength(6);
  for (const page of pack.pages) {
    expect(page.exercises).toHaveLength(2);
  }
  const types = pack.pages.flatMap((page) =>
    page.exercises.map((exercise) => exercise.type),
  );
  expect(new Set(types)).toEqual(new Set(["missingNumber", "skipCount"]));
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
