import { useEffect, useState } from "react";
import { listPrintedRecords } from "../printHistory/listPrintedRecords";
import { browserStore } from "../storage/browserStore";

type Props = {
  current: boolean;
};

export function PrintsNavLink({ current }: Props) {
  const store = browserStore();
  const [count, setCount] = useState(() => listPrintedRecords(store).length);

  useEffect(() => {
    const refresh = () => setCount(listPrintedRecords(store).length);
    window.addEventListener("kids-history", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("kids-history", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [store]);

  if (count === 0) {
    return null;
  }

  return (
    <a href="/prints/" aria-current={current ? "page" : undefined}>
      Prints
    </a>
  );
}
