export function packTablesFromRecord(tables: number[], focus?: number) {
  if (tables.length > 0) {
    return tables;
  }
  if (focus !== undefined) {
    return [focus];
  }
  return [2];
}
