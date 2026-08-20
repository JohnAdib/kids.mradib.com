export type ArrayItem = {
  rows: number;
  cols: number;
  stage: "multiply" | "divide";
  divideBy: "rows" | "cols";
};
