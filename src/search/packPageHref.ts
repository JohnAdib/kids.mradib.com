import { formatPackSearch } from "./formatPackSearch";
import type { PackSearch } from "./PackSearch";

export function packPageHref(request: PackSearch) {
  return `/maths/times-tables/?${formatPackSearch(request)}`;
}
