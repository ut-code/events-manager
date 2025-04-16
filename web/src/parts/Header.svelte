<script lang="ts">
  import { browser } from "$app/environment";
  import ThemeToggle from "@/components/ThemeToggle.svelte";
  import { debugMode } from "@/globals.svelte";
  import GitHub from "~icons/fe/github";
</script>

<header
  class="bg-base-100/60 border-base-300 sticky top-6 m-6 flex h-14 flex-row flex-wrap items-center gap-8 rounded-xl border px-6 backdrop-blur-md"
>
  <a
    href="/"
    class="hover:bg-base-200 cursor-pointer rounded-xl px-4 py-2 text-xl font-bold transition-[background-color]"
  >
    Events Manager
  </a>
  <span class="flex-grow" aria-hidden="true"></span>
  <label class="fieldset-label hidden md:block">
    debugger
    <input type="checkbox" class="toggle" bind:checked={debugMode.value} />
  </label>
  {#if browser}
    <ThemeToggle />
  {:else}
    <span class="btn w-12 md:w-32"
      ><span class="loading loading-spinner"></span></span
    >
  {/if}
  <a
    href="https://github.com/ut-code/events-manager"
    target="_blank"
    class="my-auto hidden w-8 md:block"
  >
    <GitHub class="mx-auto text-3xl" />
  </a>
  <span aria-hidden="true"></span>
</header>
