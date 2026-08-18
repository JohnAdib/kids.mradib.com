export function makeShortSeed(next: () => number) {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  let seed = "";
  for (let i = 0; i < 4; i += 1) {
    seed += alphabet[Math.floor(next() * alphabet.length)];
  }
  return seed;
}
