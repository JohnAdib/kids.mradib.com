import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ExerciseHeading({ children }: Props) {
  return <p className="exercise-help">{children}</p>;
}
