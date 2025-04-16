<script lang="ts">
  import { debugMode } from "@/globals.svelte";
  import type { SelectEvent } from "@stack/server/validator/schema.ts";
  import { lightFormat } from "date-fns";
  type Props = {
    event: Partial<SelectEvent>;
  };
  const { event }: Props = $props();

  function format(unix: number | undefined) {
    if (unix == null) return "None";
    return lightFormat(new Date(unix * 1000), "yyyy M/d H:mm");
  }
</script>

{#if debugMode.value}
  <div class="alert alert-success alert-soft">
    {JSON.stringify(event, null, " ")}
  </div>
  <div class="alert alert-warning">
    <div>start: {format(event.start)}</div>
    <div>end: {format(event.end)}</div>
  </div>
{/if}
