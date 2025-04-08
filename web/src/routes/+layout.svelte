<script lang="ts">
  import { page } from "$app/state";
  import Header from "+web/parts/Header.svelte";
  import "../app.css";

  const { children } = $props();
</script>

<svelte:head>
  <meta property="og:site_name" content="Events Manager" />
  <meta property="og:url" content={page.url.toString()} />
</svelte:head>

<Header />
{@render children()}
