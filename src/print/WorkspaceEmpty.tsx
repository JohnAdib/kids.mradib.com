type Props = {
  prompt: string;
};

export function WorkspaceEmpty({ prompt }: Props) {
  return (
    <div className="workspace-empty screen-only">
      <p>{prompt}</p>
    </div>
  );
}
