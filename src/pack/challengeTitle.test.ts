import { expect, test } from "vitest";
import { challengeTitle } from "./challengeTitle";

test("each challenge has a short English name", () => {
  expect(challengeTitle("timesFacts")).toBe("Times pop");
  expect(challengeTitle("wheel")).toBe("Pizza wheels");
  expect(challengeTitle("missingNumber")).toBe("Missing number");
  expect(challengeTitle("matchLines")).toBe("Match up");
  expect(challengeTitle("colourMultiples")).toBe("Colour the multiples");
  expect(challengeTitle("factFamily")).toBe("Fact family");
  expect(challengeTitle("skipCount")).toBe("Skip counting");
  expect(challengeTitle("arrayDots")).toBe("Arrays");
  expect(challengeTitle("partialSquare")).toBe("Complete the square");
  expect(challengeTitle("oddOneOut")).toBe("Odd one out");
  expect(challengeTitle("whichIsMore")).toBe("Which is more?");
  expect(challengeTitle("multiplesPath")).toBe("Follow the path");
});
