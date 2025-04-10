<script lang="ts">
  import ThemeToggle from "+web/components/ThemeToggle.svelte";
  import Icon from "@iconify/svelte";
</script>

<header
  class="bg-base-100/60 border-base-300 sticky top-0 m-6 flex h-14 w-full flex-row items-center gap-8 rounded-xl border px-6 backdrop-blur-md"
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
    href="https://github.com/ut-code/sveltekit-project-template"
    target="_blank"
    class="my-auto w-8"
  >
    <Icon icon="fe:github" class="mx-auto text-3xl" />
  </a>
  <span aria-hidden="true"></span>
</header>
