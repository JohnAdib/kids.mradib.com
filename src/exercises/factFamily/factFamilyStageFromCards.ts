import type { Stage } from "../../facts/Stage";
import type { FactFamilyCard } from "./FactFamilyCard";

export function factFamilyStageFromCards(cards: FactFamilyCard[]): Stage {
  const symbols = new Set(
    cards.flatMap((card) => card.lines.map((line) => line.symbol)),
  );
  const hasMultiply = symbols.has("×");
  const hasDivide = symbols.has("÷");
  if (hasMultiply && hasDivide) {
    return "mixed";
  }
  if (hasDivide) {
    return "divide";
  }
  return "multiply";
}
