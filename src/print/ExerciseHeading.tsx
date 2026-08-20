import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function ExerciseHeading({ title, children }: Props) {
  return (
    <p className="exercise-help">
      <strong className="exercise-title">{title}</strong> {children}
    </p>
  );
}
