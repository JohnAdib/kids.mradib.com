import { Blank } from "../../print/Blank";

type Props = {
  value: number | null;
  showComma: boolean;
};

export function SkipCountStep({ value, showComma }: Props) {
  return (
    <span className="skip-step">
      <span className="skip-slot">{value === null ? <Blank /> : value}</span>
      {showComma ? <span className="skip-comma">,</span> : null}
    </span>
  );
}
