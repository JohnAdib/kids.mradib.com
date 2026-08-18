import type { DivisionFact } from "../../facts/DivisionFact";
import type { MultiplicationFact } from "../../facts/MultiplicationFact";
import type { Stage } from "../../facts/Stage";

type Input = {
  multiply: MultiplicationFact[];
  divide: DivisionFact[];
  stage: Stage;
};

export function matchPairCandidates({ multiply, divide, stage }: Input) {
  const times = multiply.map((fact) => ({
    left: `${fact.a} × ${fact.b}`,
    right: String(fact.product),
  }));
  const shares = divide.map((fact) => ({
    left: `${fact.dividend} ÷ ${fact.divisor}`,
    right: String(fact.quotient),
  }));
  if (stage === "divide") {
    return shares;
  }
  if (stage === "multiply") {
    return times;
  }
  return [...times, ...shares];
}
