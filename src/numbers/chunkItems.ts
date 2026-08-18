export function chunkItems<T>(items: T[], size: number) {
  if (size <= 0 || items.length === 0) {
    return [] as T[][];
  }
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}
