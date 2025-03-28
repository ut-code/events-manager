<script lang="ts">
  import ThemeToggle from "+web/components/ThemeToggle.svelte";
  import Icon from "@iconify/svelte";
</script>

<header class="flex w-full flex-row gap-4">
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
