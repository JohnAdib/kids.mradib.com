import { expect, test } from "vitest";
import { composeChart } from "./composeChart";

test("year-style table sets print 0 to 12 for each chosen table", () => {
  const groups = composeChart({ tables: [2, 5, 10], includeInverses: true });
  expect(groups).toHaveLength(3);
  expect(groups[0]?.rows).toHaveLength(13);
  expect(groups[0]?.rows[2]?.inverse).toBe("4 ÷ 2 = 2");
});
