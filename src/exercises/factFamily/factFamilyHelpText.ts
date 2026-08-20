import type { Stage } from "../../facts/Stage";

export function factFamilyHelpText(stage: Stage) {
  if (stage === "multiply") {
    return "These multiplication facts belong together. Fill each empty box.";
  }
  if (stage === "divide") {
    return "These division facts belong together. Fill each empty box.";
  }
  return "These four facts belong together. Fill each empty box.";
}
