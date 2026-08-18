import { challengeTitle } from "./challengeTitle";
import type { PackExercise } from "./PackExercise";

export function pageComboTitle(kinds: PackExercise["type"][]) {
  return kinds.map((kind) => challengeTitle(kind)).join(" · ");
}
