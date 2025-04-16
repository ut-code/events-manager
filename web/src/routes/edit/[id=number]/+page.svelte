<script lang="ts">
  import { goto } from "$app/navigation";
  import { createClient } from "@/client.ts";
  import EventInspector from "@/components/debugger/EventInspector.svelte";
  import { debugMode } from "@/globals.svelte.ts";
  import { useToast } from "@/lib/toast/client";
  import { type InsertEvent } from "@stack/server/validator/schema.ts";

  const client = createClient({ fetch });
  const toast = useToast();

  const { data } = $props();
  let form: InsertEvent = $state(data.event);

  async function submit() {
    if (processing) return;
    processing = true;
    try {
      const r = await client.events[":id"].$put({
        param: {
          id: data.event.id.toString(),
        },
        json: form,
      });
      if (!r.ok) throw new Error("FAILED TO UPDATE");
      form = await r.json();
      toast.push({
        content: "Successfully updated!",
        color: "alert-success",
      });
    } finally {
      processing = false;
    }
  }
  let processing = $state(false);
</script>

<form
  class="mx-auto flex max-w-lg flex-col gap-2"
  onsubmit={async (e) => {
    e.preventDefault();
    await submit();
    goto("/");
  }}
>
  <input class="input" bind:value={form.name} />
  <input class="input" bind:value={form.description} />
  <div class="flex flex-row justify-stretch">
    <a href="/" class="btn btn-neutral">Cancel</a>
    <button type="submit" aria-busy={processing} class="btn btn-primary">
      {#if processing}
        <span class="loading loading-spinner"></span>
      {:else}
        <span>save</span>
      {/if}
    </button>
  </div>
  {#if debugMode.value}
    <div class="alert alert-error alert-soft">
      status: {processing ? "processing" : "avail"}
    </div>
    <EventInspector event={form} />
  {/if}
</form>
