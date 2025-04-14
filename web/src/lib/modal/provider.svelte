<script lang="ts">
  import type { ModalController } from "./controller.svelte.ts";

  type Props = {
    modal: ModalController;
  };
  const { modal }: Props = $props();

  let el = $state<HTMLDialogElement>();
  $effect(() => {
    if (modal.shown) {
      el?.showModal();
    } else {
      el?.close();
    }
  });
</script>

<dialog
  class="modal"
  bind:this={el}
  onclose={() => {
    console.log("closing modal...");
    modal.onclose();
  }}
>
  {#if modal.shown}
    <div class="modal-box">
      {modal.shown.text}
      <div class="modal-action">
        {#each modal.shown.buttons as button, idx}
          <button
            onclick={() => {
              modal.shown?.onclick(idx);
            }}
            class={["btn", button.color]}
          >
            {button.content}
          </button>
        {/each}
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  {/if}
</dialog>
