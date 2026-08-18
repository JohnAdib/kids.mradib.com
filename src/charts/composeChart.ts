import type { ChartGroup } from "./ChartGroup";

type Input = {
  tables: number[];
  includeInverses: boolean;
};

export function composeChart({ tables, includeInverses }: Input): ChartGroup[] {
  return tables.map((table) => ({
    table,
    rows: Array.from({ length: 13 }, (_, factor) => {
      const product = table * factor;
      const inverse =
        includeInverses && table !== 0
          ? `${product} ÷ ${table} = ${factor}`
          : includeInverses && factor !== 0
            ? `${product} ÷ ${factor} = ${table}`
            : null;
      return {
        expression: `${table} × ${factor} = ${product}`,
        inverse,
      };
    }),
  }));
}
