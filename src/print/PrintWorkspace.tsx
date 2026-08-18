import type { ReactNode } from "react";

type Props = {
  form: ReactNode;
  preview: ReactNode;
  toolbar: ReactNode;
};

export function PrintWorkspace({ form, preview, toolbar }: Props) {
  return (
    <div className="print-workspace">
      <div className="print-workspace-toolbar screen-only">{toolbar}</div>
      <div className="print-workspace-preview">{preview}</div>
      <aside className="print-workspace-form screen-only">{form}</aside>
    </div>
  );
}
