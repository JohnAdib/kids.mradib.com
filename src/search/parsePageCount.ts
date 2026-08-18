import { defaultPageCount } from "../pack/defaultPageCount";
import { pageCounts } from "../pack/pageCounts";
import { readPositiveInteger } from "./readPositiveInteger";

export function parsePageCount(raw: string | null) {
  const value = readPositiveInteger(raw);
  if (value !== undefined && pageCounts.some((count) => count === value)) {
    return value;
  }
  return defaultPageCount;
}
