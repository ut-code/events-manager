<script lang="ts">
  type Props = {
    title: string; // title of page. used for <title> and og:title
    thumbnail: string | null; // thumbnail of page. used for og:image. TIP: svgs don't work on discord
    description: string | null; // description of page. used for og:description
  };
  const { title: _title, thumbnail, description }: Props = $props();
  const title = $derived(`${_title} | Events Manager`);
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="og:image" content={thumbnail} />
  <meta property="og:description" content={description} />
</svelte:head>
