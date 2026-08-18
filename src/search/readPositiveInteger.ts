export function readPositiveInteger(value: string | null) {
  if (value === null) {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}
