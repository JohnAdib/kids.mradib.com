import type { PackChallengeId } from "./PackChallengeId";
import { packChallengeIds } from "./packChallengeIds";

export function toggleChallengeId(
  current: PackChallengeId[],
  id: PackChallengeId,
) {
  const next = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];
  return packChallengeIds.filter((item) => next.includes(item));
}
