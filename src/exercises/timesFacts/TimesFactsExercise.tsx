import { chunkItems } from "../../numbers/chunkItems";
import { ExerciseHeading } from "../../print/ExerciseHeading";
import { FactSlot } from "../../print/FactSlot";
import type { MissingNumberItem } from "../missingNumber/MissingNumberItem";
import { timesFactsBandSize } from "./timesFactsBandSize";

type Props = {
  items: MissingNumberItem[];
};

export function TimesFactsExercise({ items }: Props) {
  const bands = chunkItems(items, timesFactsBandSize);
  return (
    <section>
      <ExerciseHeading>Write the product in the box.</ExerciseHeading>
      <div className="times-facts-bands">
        {bands.map((band, bandIndex) => (
          <div className="times-facts-grid" key={bandIndex}>
            {band.map((item, index) => (
              <div
                className="times-fact"
                key={`${item.left}-${item.symbol}-${item.right}-${index}`}
              >
                <FactSlot value={item.left} />
                <span>{item.symbol}</span>
                <FactSlot value={item.right} />
                <span>=</span>
                <FactSlot value={null} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
