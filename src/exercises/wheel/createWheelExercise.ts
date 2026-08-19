import type { Stage } from "../../facts/Stage";
import { timesTableFactors } from "../../facts/timesTableFactors";
import { shuffleCopy } from "../../rng/shuffleCopy";
import type { WheelSpec } from "./WheelSpec";

type Input = {
  focus: number;
  stage: Stage;
  count: number;
  next: () => number;
};

export function createWheelExercise({
  focus,
  stage,
  count,
  next,
}: Input): WheelSpec[] {
  const wheels: WheelSpec[] = [];
  for (let w = 0; w < count; w += 1) {
    const factors = shuffleCopy(timesTableFactors, next);
    wheels.push({
      center: focus,
      sectors: factors.map((factor, index) => {
        const hideInner = shouldHideInner(stage, index, next);
        const hideOuter = !hideInner;
        return {
          inner: hideInner ? null : factor,
          outer: hideOuter ? null : focus * factor,
          innerAnswer: factor,
          outerAnswer: focus * factor,
        };
      }),
    });
  }
  return wheels;
}

function shouldHideInner(stage: Stage, index: number, next: () => number) {
  if (stage === "multiply") {
    return false;
  }
  if (stage === "divide") {
    return true;
  }
  return index % 2 === 0 ? next() < 0.5 : next() >= 0.5;
}
