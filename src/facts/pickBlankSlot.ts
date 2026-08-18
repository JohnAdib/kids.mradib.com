import type { BlankSlot } from "./BlankSlot";
import type { Stage } from "./Stage";

export function pickBlankSlot(stage: Stage, next: () => number): BlankSlot {
  if (stage === "multiply") {
    return "product";
  }
  if (stage === "divide") {
    return next() < 0.5 ? "b" : "a";
  }
  const slots: BlankSlot[] = ["a", "b", "product"];
  const index = Math.floor(next() * slots.length);
  return slots[index] ?? "product";
}
