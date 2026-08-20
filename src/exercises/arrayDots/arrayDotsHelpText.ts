import type { ArrayItem } from "./ArrayItem";

export function arrayDotsHelpText(items: ArrayItem[]) {
  const hasMultiply = items.some((item) => item.stage === "multiply");
  const hasDivide = items.some((item) => item.stage === "divide");
  if (hasMultiply && hasDivide) {
    return "Count the array, then write the missing number.";
  }
  if (hasDivide) {
    return "Count the array, then write the quotient.";
  }
  return "Count the array, then write the product.";
}
