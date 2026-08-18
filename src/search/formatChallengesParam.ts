import type { PackChallengeId } from "../pack/PackChallengeId";

export function formatChallengesParam(challenges: PackChallengeId[]) {
  return challenges.join(",");
}
