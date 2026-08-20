import type { CompareItem } from "./CompareItem";

export function compareExpressionText(
  side: CompareItem["left"],
  symbol: CompareItem["symbol"],
) {
  return `${side.a} ${symbol} ${side.b}`;
}
