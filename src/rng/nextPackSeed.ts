import { createSeededRandom } from "./createSeededRandom";
import { makeShortSeed } from "./makeShortSeed";

export function nextPackSeed() {
  return makeShortSeed(
    createSeededRandom(`${Date.now()}-${performance.now()}`),
  );
}
