import { expect, test } from "vitest";
import { fillGridTracks } from "./fillGridTracks";

test("builds equal flex tracks for a print grid", () => {
  expect(fillGridTracks(10, 12)).toEqual({
    gridTemplateColumns: "repeat(10, minmax(0, 1fr))",
    gridTemplateRows: "repeat(12, minmax(0, 1fr))",
  });
});
