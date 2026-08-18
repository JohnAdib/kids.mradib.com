import type { ReactNode } from "react";
import { challengeTitle } from "../pack/challengeTitle";
import type { PackExercise } from "../pack/PackExercise";

type Props = {
  kind: PackExercise["type"];
  children: ReactNode;
};

export function ExerciseHeading({ kind, children }: Props) {
  return (
    <>
      <h3 className="exercise-title">{challengeTitle(kind)}</h3>
      <p className="exercise-help">{children}</p>
    </>
  );
}
