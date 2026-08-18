export function formatSuggestedTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const leftover = seconds % 60;
  if (minutes === 0) {
    return `${leftover} seconds`;
  }
  if (leftover === 0) {
    return minutes === 1 ? "1 minute" : `${minutes} minutes`;
  }
  return `${minutes} minutes ${leftover} seconds`;
}
