export type MissingNumberItem = {
  left: number;
  right: number;
  result: number;
  symbol: "×" | "÷";
  blank: "left" | "right" | "result";
  answer: number;
};
