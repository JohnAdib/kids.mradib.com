import { expect, test } from "vitest";
import { arrayItemAnswer } from "./arrayItemAnswer";

test("multiply arrays answer with the product", () => {
  expect(
    arrayItemAnswer({
      rows: 3,
      cols: 4,
      stage: "multiply",
      divideBy: "rows",
    }),
  ).toBe("3 × 4 = 12");
});

test("divide arrays answer with the quotient", () => {
  expect(
    arrayItemAnswer({
      rows: 3,
      cols: 4,
      stage: "divide",
      divideBy: "rows",
    }),
  ).toBe("12 ÷ 3 = 4");
  expect(
    arrayItemAnswer({
      rows: 3,
      cols: 4,
      stage: "divide",
      divideBy: "cols",
    }),
  ).toBe("12 ÷ 4 = 3");
});
