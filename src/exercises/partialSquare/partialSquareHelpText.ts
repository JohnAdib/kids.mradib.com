export function partialSquareHelpText(focusTables: number[]) {
  if (focusTables.length === 1) {
    return `Complete the ${focusTables[0]} times table. Fill every empty box.`;
  }
  if (focusTables.length > 1) {
    const tables = focusTables.join(", ");
    return `Complete the ${tables} times tables. Fill every empty box.`;
  }
  return "Complete this times table. Fill every empty box.";
}
