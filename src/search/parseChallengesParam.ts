import type { PackChallengeId } from "../pack/PackChallengeId";
import { packChallengeIds } from "../pack/packChallengeIds";

export function parseChallengesParam(raw: string | null) {
  if (raw === null) {
    return undefined;
  }
  const chosen: PackChallengeId[] = [];
  for (const token of raw.split(",")) {
    const match = packChallengeIds.find(
      (challenge) => challenge === token.trim(),
    );
    if (match && !chosen.includes(match)) {
      chosen.push(match);
    }
  }
  return chosen;
}
