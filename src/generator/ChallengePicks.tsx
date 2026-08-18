import { challengeTitle } from "../pack/challengeTitle";
import type { PackChallengeId } from "../pack/PackChallengeId";
import { packChallengeIds } from "../pack/packChallengeIds";
import { sameIdSet } from "../pack/sameIdSet";
import { toggleChallengeId } from "../pack/toggleChallengeId";

type Props = {
  challenges: PackChallengeId[];
  onChange: (challenges: PackChallengeId[]) => void;
};

export function ChallengePicks({ challenges, onChange }: Props) {
  const allOn = sameIdSet(challenges, packChallengeIds);
  return (
    <fieldset className="challenge-chips">
      <legend className="challenge-chips-label">Challenges</legend>
      <button
        type="button"
        className={allOn ? "chip-toggle is-on" : "chip-toggle"}
        aria-pressed={allOn}
        onClick={() => onChange([...packChallengeIds])}
      >
        All
      </button>
      {packChallengeIds.map((id) => {
        const on = challenges.includes(id);
        return (
          <button
            type="button"
            key={id}
            className={on ? "chip-toggle is-on" : "chip-toggle"}
            aria-pressed={on}
            onClick={() => onChange(toggleChallengeId(challenges, id))}
          >
            {challengeTitle(id)}
          </button>
        );
      })}
    </fieldset>
  );
}
