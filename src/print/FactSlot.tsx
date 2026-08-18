type Props = {
  value: number | null;
};

export function FactSlot({ value }: Props) {
  return (
    <span className={value === null ? "fact-slot is-blank" : "fact-slot"}>
      {value === null ? "\u00a0" : value}
    </span>
  );
}
