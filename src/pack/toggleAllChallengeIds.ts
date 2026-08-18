import type { PackChallengeId } from "./PackChallengeId";
import { packChallengeIds } from "./packChallengeIds";
import { sameIdSet } from "./sameIdSet";

export function toggleAllChallengeIds(current: PackChallengeId[]) {
  if (sameIdSet(current, packChallengeIds)) {
    return [] as PackChallengeId[];
  }
  return [...packChallengeIds];
}
