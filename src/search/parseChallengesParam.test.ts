import { expect, test } from "vitest";
import { parseChallengesParam } from "./parseChallengesParam";

test("unknown tokens are dropped", () => {
  expect(parseChallengesParam("wheel,nope,oddOneOut")).toEqual([
    "wheel",
    "oddOneOut",
  ]);
});

test("an empty list is none ticked", () => {
  expect(parseChallengesParam("")).toEqual([]);
});

test("missing text is not a choice", () => {
  expect(parseChallengesParam(null)).toBeUndefined();
});
