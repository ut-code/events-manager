<script lang="ts">
  import { createClient } from "@/client";
  import type { SelectEvent } from "@stack/server/validator/schema";
  import type { Popover } from "melt/builders";

  type Props = {
    event: SelectEvent;
    popover: Popover;
    onupdate: (event: "delete") => Promise<void>;
  };
  const { event, popover, onupdate }: Props = $props();
  const client = createClient({ fetch });
  let processing = $state(false);
</script>

<div {...popover.content} class="round-xl border-base-200 bg-base-100 border-2">
  <ul
    class="menu dropdown-content bg-base-100 rounded-box z-1 flex w-52 flex-col gap-2 p-2 shadow-sm"
  >
    <li>
      <a class="btn btn-accent" href={`/edit/${event.id}`}>edit</a>
    </li>
    <li>
      <button
        class="btn btn-error"
        disabled={processing}
        onclick={async () => {
          processing = true;
          try {
            await client.events[":id"].$delete({
              param: {
                id: event.id.toString(),
              },
            });
          } finally {
            await onupdate("delete");
            processing = false;
          }
        }}>delete</button
      >
    </li>
  </ul>
</div>
