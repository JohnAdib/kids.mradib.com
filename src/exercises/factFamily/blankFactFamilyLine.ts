import { pickInteger } from "../../rng/pickInteger";
import type { FactFamilyLine } from "./FactFamilyLine";

export function blankFactFamilyLine(
  left: number,
  right: number,
  result: number,
  symbol: "×" | "÷",
  next: () => number,
): FactFamilyLine {
  const slot = pickInteger(next, 0, 2);
  return {
    left: slot === 0 ? null : left,
    right: slot === 1 ? null : right,
    result: slot === 2 ? null : result,
    symbol,
    answer: `${left} ${symbol} ${right} = ${result}`,
  };
}
