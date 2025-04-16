<script lang="ts">
  import type { SelectEvent } from "@stack/server/validator/schema.ts";
  import { lightFormat } from "date-fns";
  import { Popover } from "melt/builders";
  import { slide } from "svelte/transition";
  import Dots from "~icons/fe/elipsis-h";
  import EventPopover from "./EventPopover.svelte";

  const popover = new Popover();
  type Props = {
    event: SelectEvent;
    onupdate: (event: "delete") => Promise<void>;
  };
  const { event, onupdate }: Props = $props();
  const start = $derived(new Date(event.start * 1000));
</script>

<li class="list-row" transition:slide>
  <span class="font-medium">{event.name}</span>
  <span>{lightFormat(start, "M/d")}</span>
  <span class="list-col-grow line-clamp-1 text-sm font-light">
    {event.description}
  </span>
  <span>
    {#if event.allday}
      {lightFormat(start, "yyyy/MM/dd")}
    {:else}
      {lightFormat(start, "yyyy/MM/dd HH:mm")}
    {/if}
  </span>
  <button {...popover.trigger}>
    <Dots class="h-6 w-6 cursor-pointer" />
  </button>
  <EventPopover {event} {popover} {onupdate} />
</li>
