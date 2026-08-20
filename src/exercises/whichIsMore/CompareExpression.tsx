type Props = {
  a: number;
  b: number;
  symbol: "×" | "÷";
};

export function CompareExpression({ a, b, symbol }: Props) {
  return (
    <>
      <span className="compare-factor">{a}</span>
      <span className="compare-symbol">{symbol}</span>
      <span className="compare-factor">{b}</span>
    </>
  );
}
