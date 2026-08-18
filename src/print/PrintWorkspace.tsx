import type { ReactNode } from "react";

type Props = {
  form: ReactNode;
  preview: ReactNode;
};

export function PrintWorkspace({ form, preview }: Props) {
  return (
    <div className="print-workspace">
      <div className="print-workspace-preview">{preview}</div>
      <aside className="print-workspace-form screen-only">{form}</aside>
    </div>
  );
}
