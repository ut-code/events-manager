<script lang="ts">
  import ErrorPage from "+web/components/ErrorPage.svelte";
  import EventList from "+web/components/EventList.svelte";
  import PageHead from "+web/parts/PageHead.svelte";

  const { data } = $props();
</script>

<PageHead title="Events Manager" thumbnail={null} description={null} />

{#await data.events}
  loading...
{:then events}
  <EventList {events} />
{:catch err}
  <ErrorPage {err} />
{/await}

<a href="/new" class="btn btn-primary">create new</a>
