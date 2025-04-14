<script lang="ts">
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
</script>

<div class="dropdown w-32">
  <button
    class="btn w-full text-left align-middle text-sm"
    popovertarget="theme-toggle-dropdown"
    popovertargetaction="toggle"
  >
    <span class="w-4">
      <Icon />
    </span>
    <span>{labels[theme.current]}</span>
  </button>

  <ul class="dropdown-content w-40">
    {#each themes as t}
      <li>
        <input
          type="radio"
          name="theme"
          class="theme-controller btn btn-block btn-sm justify-start"
          aria-label={labels[t]}
          value={t}
          bind:group={theme.current}
        />
      </li>
    {/each}
  </ul>
</div>
