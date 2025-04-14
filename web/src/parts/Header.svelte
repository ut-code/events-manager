<script lang="ts">
  import ThemeToggle from "+web/components/ThemeToggle.svelte";
  import GitHub from "~icons/fe/github";
</script>

<header
  class="bg-base-100/60 border-base-300 sticky top-6 m-6 flex h-14 flex-row items-center gap-8 rounded-xl border px-6 backdrop-blur-md"
>
  <a
    href="/"
    class="hover:bg-base-200 cursor-pointer rounded-xl px-4 py-2 text-xl font-bold transition-[background-color]"
  >
    Events Manager
  </a>
  <span class="flex-grow" aria-hidden="true"></span>
  <ThemeToggle />
  <a
    href="https://github.com/ut-code/events-manager"
    target="_blank"
    class="my-auto w-8"
  >
    <GitHub class="mx-auto text-3xl" />
  </a>
  <span aria-hidden="true"></span>
</header>
