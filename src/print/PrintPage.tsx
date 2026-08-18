import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function PrintPage({ children }: Props) {
  return (
    <article className="print-page-shell">
      <div className="print-page">{children}</div>
    </article>
  );
}
