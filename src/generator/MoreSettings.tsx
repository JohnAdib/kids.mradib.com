import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function MoreSettings({ children }: Props) {
  return (
    <details className="more-settings">
      <summary>More</summary>
      {children}
    </details>
  );
}
