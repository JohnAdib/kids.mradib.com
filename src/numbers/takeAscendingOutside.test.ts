import { expect, test } from "vitest";
import { takeAscendingOutside } from "./takeAscendingOutside";

test("fills a count by walking past excluded numbers", () => {
  expect(takeAscendingOutside([2, 4, 6], 4)).toEqual([1, 3, 5, 7]);
});
