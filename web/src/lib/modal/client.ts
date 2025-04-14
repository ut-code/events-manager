import { modalContext } from "./controller.svelte";

export function useModal() {
  return modalContext.get();
}
