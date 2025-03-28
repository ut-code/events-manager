export function panic(...message: unknown[]): never {
  console.error(...message);
  throw new Error("PANIC EXPRESSION CALLED");
}
