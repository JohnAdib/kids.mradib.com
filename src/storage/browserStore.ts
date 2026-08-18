import { createMemoryStore } from "./createMemoryStore";

export function browserStore() {
  if (typeof localStorage === "undefined") {
    return createMemoryStore();
  }
  return localStorage;
}
