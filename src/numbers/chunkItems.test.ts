import { expect, test } from "vitest";
import { chunkItems } from "./chunkItems";

test("chunks a list into even bands", () => {
  expect(chunkItems([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
});
