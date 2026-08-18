import { expect, test } from "vitest";
import { challengeTitle } from "./challengeTitle";

test("each challenge has a short name a child can say", () => {
  expect(challengeTitle("wheel")).toBe("Pizza wheel");
  expect(challengeTitle("missingNumber")).toBe("Sneaky blanks");
  expect(challengeTitle("matchLines")).toBe("Join the pals");
  expect(challengeTitle("colourMultiples")).toBe("Paint hunt");
  expect(challengeTitle("factFamily")).toBe("Fact house");
  expect(challengeTitle("skipCount")).toBe("Frog hops");
  expect(challengeTitle("arrayDots")).toBe("Egg boxes");
  expect(challengeTitle("partialSquare")).toBe("Broken grid");
  expect(challengeTitle("oddOneOut")).toBe("Odd sock");
  expect(challengeTitle("whichIsMore")).toBe("Bigger pile");
  expect(challengeTitle("multiplesPath")).toBe("Treasure trail");
});
