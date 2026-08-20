import type { FactFamilyLine } from "./FactFamilyLine";

export type FactFamilyCard = {
  a: number;
  b: number;
  product: number;
  lines: FactFamilyLine[];
};
