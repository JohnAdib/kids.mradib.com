export function sameIdSet<T>(left: T[], right: T[]) {
  if (left.length !== right.length) {
    return false;
  }
  return left.every((item) => right.includes(item));
}
