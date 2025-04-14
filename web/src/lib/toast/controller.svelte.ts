import { Context } from "runed";

const TOAST_BASE_TIMEOUT = 3000;

export type Toast = {
  id: number;
  content: string;
  color?: "alert-info" | "alert-success" | "alert-warning" | "alert-error";
  style?: "alert-outline" | "alert-dash" | "alert-soft";
};

export class ToastController {
  items: Toast[] = $state([]);

  constructor() {
    toastContext.set(this);
  }

  push(toast: Omit<Toast, "id">, timeoutMultiplier = 1) {
    const id = Math.random();
    this.items.unshift({
      ...toast,
      id,
    });
    setTimeout(() => {
      this.items = this.items.filter((t) => t.id !== id);
    }, timeoutMultiplier * TOAST_BASE_TIMEOUT);
  }
  clear() {
    this.items = [];
  }
}

export const toastContext = new Context<ToastController>("toast");
