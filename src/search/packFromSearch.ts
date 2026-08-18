import { composePack } from "../pack/composePack";
import { nextSequence } from "../pack/nextSequence";
import { sequenceKey } from "../pack/sequenceKey";
import { createSeededRandom } from "../rng/createSeededRandom";
import { makeShortSeed } from "../rng/makeShortSeed";
import type { PackSearch } from "../search/PackSearch";

type Store = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

export function packFromSearch(request: PackSearch, store: Store) {
  const sequence =
    request.sequence ??
    (request.seed
      ? 1
      : nextSequence(
          store,
          sequenceKey("pack", request.tables.join("-"), request.stage),
        ));
  const seed =
    request.seed ??
    makeShortSeed(createSeededRandom(`${Date.now()}-${sequence}`));
  const pack = composePack({
    tables: request.tables,
    stage: request.stage,
    seed,
    sequence,
  });
  return {
    pack,
    request: {
      ...request,
      tables: pack.tables,
      stage: pack.stage,
      seed: pack.seed,
      sequence: pack.sequence,
    },
  };
}
