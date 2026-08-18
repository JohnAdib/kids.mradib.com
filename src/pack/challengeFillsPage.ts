import type { PackChallengeId } from "./PackChallengeId";

export function challengeFillsPage(kind: PackChallengeId) {
  return (
    kind === "colourMultiples" ||
    kind === "partialSquare" ||
    kind === "multiplesPath" ||
    kind === "wheel" ||
    kind === "arrayDots"
  );
}
