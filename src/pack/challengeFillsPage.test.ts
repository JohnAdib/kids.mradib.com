import { expect, test } from "vitest";
import { challengeFillsPage } from "./challengeFillsPage";

test("big picture challenges keep the whole A4 to themselves", () => {
  expect(challengeFillsPage("wheel")).toBe(true);
  expect(challengeFillsPage("colourMultiples")).toBe(true);
  expect(challengeFillsPage("partialSquare")).toBe(true);
  expect(challengeFillsPage("multiplesPath")).toBe(true);
  expect(challengeFillsPage("arrayDots")).toBe(true);
  expect(challengeFillsPage("timesFacts")).toBe(true);
  expect(challengeFillsPage("matchLines")).toBe(false);
});
