import { toastContext } from "./controller.svelte.ts";

export function useToast() {
  return toastContext.get();
}
