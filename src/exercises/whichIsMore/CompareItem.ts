export type CompareItem = {
  left: { a: number; b: number };
  right: { a: number; b: number };
  symbol: "×" | "÷";
  leftValue: number;
  rightValue: number;
};
