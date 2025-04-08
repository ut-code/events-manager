<script lang="ts">
  import { onMount } from "svelte";

  type Props = {
    err: unknown;
  };
  const { err }: Props = $props();

  onMount(() => {
    console.error(err);
  });
</script>

Something went wrong:
{#if typeof err === "object" && err !== null && "message" in err}
  {err.message}
{:else}
  unknown shaped error. see console for more...
{/if}
