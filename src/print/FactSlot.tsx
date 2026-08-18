type Props = {
  value: number | null;
};

export function FactSlot({ value }: Props) {
  if (value === null) {
    return <span className="write-box">&nbsp;</span>;
  }
  return <span className="fact-slot">{value}</span>;
}
