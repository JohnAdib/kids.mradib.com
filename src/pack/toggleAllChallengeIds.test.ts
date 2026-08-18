import { expect, test } from "vitest";
import { packChallengeIds } from "./packChallengeIds";
import { toggleAllChallengeIds } from "./toggleAllChallengeIds";

test("All selects every challenge, then clears them", () => {
  expect(toggleAllChallengeIds(["timesFacts"])).toEqual(packChallengeIds);
  expect(toggleAllChallengeIds(packChallengeIds)).toEqual([]);
});
