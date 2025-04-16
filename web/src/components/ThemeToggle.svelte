<script lang="ts">
  import { Popover } from "melt/builders";
  import ThemeOS from "~icons/fe/laptop";
  import ThemeDark from "~icons/fe/moon";
  import ThemeLight from "~icons/fe/sunny-o";

  import { PersistedState } from "runed";
  const theme = new PersistedState<(typeof themes)[number]>(
    "theme-preference",
    "",
  );

  const themes = ["", "light", "dark"] as const;
  const labels = {
    "": "Auto",
    light: "Light",
    dark: "Dark",
  };
  const icons = {
    "": ThemeOS,
    light: ThemeLight,
    dark: ThemeDark,
  };

  const Icon = $derived(icons[theme.current]);

  const popover = new Popover();
</script>

<div class="w-12 md:w-32">
  <button
    {...popover.trigger}
    class="btn w-full text-left align-middle text-sm"
  >
    <span class="w-4">
      <Icon />
    </span>
    <span class="hidden md:block">{labels[theme.current]}</span>
  </button>

  <div
    {...popover.content}
    class="bg-base-100 border-base-300 w-40 rounded-md border"
  >
    {#each themes as t}
      <input
        type="radio"
        name="theme"
        class="theme-controller btn btn-block btn-sm justify-start"
        aria-label={labels[t]}
        value={t}
        bind:group={theme.current}
      />
    {/each}
  </div>
</div>
