import { challengeTitle } from "../pack/challengeTitle";
import type { PackChallengeId } from "../pack/PackChallengeId";
import { packChallengeIds } from "../pack/packChallengeIds";
import { toggleChallengeId } from "../pack/toggleChallengeId";

type Props = {
  challenges: PackChallengeId[];
  onChange: (challenges: PackChallengeId[]) => void;
};

export function ChallengePicks({ challenges, onChange }: Props) {
  return (
    <fieldset className="challenge-picks">
      <legend>Challenges</legend>
      {packChallengeIds.map((id) => (
        <label key={id}>
          <input
            type="checkbox"
            checked={challenges.includes(id)}
            onChange={() => onChange(toggleChallengeId(challenges, id))}
          />
          {challengeTitle(id)}
        </label>
      ))}
    </fieldset>
  );
}
