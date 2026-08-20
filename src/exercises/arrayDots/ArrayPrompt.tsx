import { Blank } from "../../print/Blank";
import type { ArrayItem } from "./ArrayItem";

type Props = {
  item: ArrayItem;
};

export function ArrayPrompt({ item }: Props) {
  if (item.stage === "divide") {
    const product = item.rows * item.cols;
    if (item.divideBy === "rows") {
      return (
        <>
          {product} ÷ {item.rows} = <Blank />
        </>
      );
    }
    return (
      <>
        {product} ÷ {item.cols} = <Blank />
      </>
    );
  }
  return (
    <>
      {item.rows} × {item.cols} = <Blank />
    </>
  );
}
