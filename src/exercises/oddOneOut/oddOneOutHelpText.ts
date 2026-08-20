import type { OddOneOutItem } from "./OddOneOutItem";

export function oddOneOutHelpText(items: OddOneOutItem[]) {
  const symbols = items.flatMap((item) => item.options).join("");
  const hasMultiply = symbols.includes("×");
  const hasDivide = symbols.includes("÷");
  if (hasMultiply && hasDivide) {
    return "Circle the fact that is wrong.";
  }
  if (hasDivide) {
    return "Circle the division fact that is wrong.";
  }
  return "Circle the multiplication fact that is wrong.";
}
