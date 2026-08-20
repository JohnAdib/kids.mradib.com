import type { ArrayItem } from "./ArrayItem";

export function arrayItemAnswer(item: ArrayItem) {
  if (item.stage === "divide") {
    const product = item.rows * item.cols;
    if (item.divideBy === "rows") {
      return `${product} ÷ ${item.rows} = ${item.cols}`;
    }
    return `${product} ÷ ${item.cols} = ${item.rows}`;
  }
  return `${item.rows} × ${item.cols} = ${item.rows * item.cols}`;
}
