export function sequenceKey(
  kind: "pack" | "chart",
  focus: number | string,
  stage: string,
) {
  return `kids.seq.${kind}.${focus}.${stage}`;
}
