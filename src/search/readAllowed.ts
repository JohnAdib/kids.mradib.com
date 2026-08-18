export function readAllowed<T extends string>(
  value: string | null,
  allowed: readonly T[],
  fallback: T,
) {
  if (value !== null && (allowed as readonly string[]).includes(value)) {
    return value as T;
  }
  return fallback;
}
