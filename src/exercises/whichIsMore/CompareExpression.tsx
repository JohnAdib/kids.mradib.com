type Props = {
  a: number;
  b: number;
};

export function CompareExpression({ a, b }: Props) {
  return (
    <>
      <span className="compare-factor">{a}</span>
      <span className="compare-symbol">×</span>
      <span className="compare-factor">{b}</span>
    </>
  );
}
