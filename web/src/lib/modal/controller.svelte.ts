import { Context } from "runed";

export const modalContext = new Context<ModalClient>("modal");

type ModalButton<T> = {
  content: string;
  color?: `btn-${string}`;
  onclick: () => T;
};

export class ModalClient {
  constructor(private ctl: ModalController) {}
  show<T>(text: string, buttons: ModalButton<T>[]) {
    return this.ctl.show(text, buttons);
  }
}

export class ModalController {
  constructor() {
    modalContext.set(new ModalClient(this));
  }
  shown = $state<ModalInstance<unknown> | null>(null);
  onclose: () => void = () => {};
  show<T>(text: string, buttons: ModalButton<T>[]) {
    if (this.shown) throw new Error("there's already another modal shown!");
    const promise = new Promise<T | undefined>((resolve) => {
      const inst = new ModalInstance(text, buttons, (idx) => {
        resolve(buttons[idx]?.onclick());
        this.onclose = () => {};
        this.shown = null;
      });
      this.onclose = () => {
        resolve(undefined);
        this.onclose = () => {};
        this.shown = null;
      };
      this.shown = inst;
    });
    return promise;
  }
}

export class ModalInstance<T> {
  constructor(
    public text: string,
    public buttons: ModalButton<T>[],
    public onclick: (idx: number) => void,
  ) {}
}
