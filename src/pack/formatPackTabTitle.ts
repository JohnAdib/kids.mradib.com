import { formatTableSet } from "./formatTableSet";

export function formatPackTabTitle(tables: number[]) {
  if (tables.length === 0) {
    return "Times tables practice — Kids";
  }
  return `${formatTableSet(tables)} times tables — Kids`;
}
