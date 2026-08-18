import type { Stage } from "../facts/Stage";

type Props = {
  stage: Stage;
  onChange: (stage: Stage) => void;
};

const stages: { value: Stage; label: string }[] = [
  { value: "multiply", label: "Multiply" },
  { value: "divide", label: "Divide" },
  { value: "mixed", label: "Mixed" },
];

export function StagePicks({ stage, onChange }: Props) {
  return (
    <fieldset className="stage-picks">
      <legend className="stage-picks-label">Stage</legend>
      <div className="stage-options">
        {stages.map((item) => (
          <label
            key={item.value}
            className={stage === item.value ? "is-on" : undefined}
          >
            <input
              type="radio"
              name="stage"
              value={item.value}
              checked={stage === item.value}
              onChange={() => onChange(item.value)}
            />
            {item.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
