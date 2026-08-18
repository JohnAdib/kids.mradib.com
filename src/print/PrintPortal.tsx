import type { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
};

export function PrintPortal({ children }: Props) {
  return createPortal(children, document.body);
}
