import { teachOrder } from "./teachOrder";

export function priorTables(focus: number) {
  const index = teachOrder.findIndex((table) => table === focus);
  if (index <= 0) {
    return [] as number[];
  }
  return [...teachOrder.slice(0, index)];
}
