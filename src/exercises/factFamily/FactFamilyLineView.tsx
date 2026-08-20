import { FactSlot } from "../../print/FactSlot";
import type { FactFamilyLine } from "./FactFamilyLine";

type Props = {
  line: FactFamilyLine;
};

export function FactFamilyLineView({ line }: Props) {
  return (
    <p>
      <FactSlot value={line.left} /> {line.symbol}{" "}
      <FactSlot value={line.right} /> = <FactSlot value={line.result} />
    </p>
  );
}
