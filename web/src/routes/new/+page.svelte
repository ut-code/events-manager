<script lang="ts">
  import { assert, flatten, safeParse } from "valibot";

  import { goto } from "$app/navigation";
  import { createClient } from "@/client";
  import EventInspector from "@/components/debugger/EventInspector.svelte";
  import { GetsetDatetime } from "@/lib/GetsetDatetime.svelte";
  import { toastContext } from "@/lib/toast/controller.svelte";
  import { InsertEvent } from "@stack/server/validator/schema.ts";

  let form: Partial<InsertEvent> = $state({});
  let errors: Record<string, string | string[] | undefined> | undefined =
    $state(undefined);
  let createMore = $state(false);

  const DayOption = [
    {
      label: "Normal",
      options: {
        allday: false,
        multiday: false,
      },
    },
    {
      label: "All Day",
      options: {
        allday: true,
        multiday: false,
      },
    },
    {
      label: "Multi Day",
      options: {
        allday: true,
        multiday: true,
      },
    },
  ] as const;
  type DayOption = (typeof DayOption)[number];
  let dayOption = $state<DayOption>(DayOption[0]);
  $effect(() => {
    form.allday = dayOption.options.allday;
    form.multiday = dayOption.options.multiday;
  });

  const client = createClient({ fetch });
  const toast = toastContext.get();

  const startDate = new GetsetDatetime(
    () => form.start,
    (val) => {
      form.start = val;
    },
  );
  const endDate = new GetsetDatetime(
    () => form.end,
    (val) => {
      form.end = val;
    },
  );
</script>

<main class="mx-auto mt-10 max-w-lg">
  <form
    class="item-end flex flex-col gap-2 pt-2"
    onsubmit={async (ev) => {
      ev.preventDefault();
      if (form.allday) {
        startDate.time = "00:00";
        endDate.time = "00:00";
      }
      if (!form.multiday) {
        endDate.date = startDate.date;
        console.log(startDate.date);
      }
      const result = safeParse(InsertEvent, form);
      if (!result.success) {
        console.error(result.issues);
        errors = flatten(result.issues).nested;
        return;
      }
      errors = undefined;
      assert(InsertEvent, form); // this should not throw
      const res = await client.events.$post({
        json: form,
      });
      if (!res.ok)
        throw new Error(
          `Failed to post: status ${res.status} with text: ${await res.text()}`,
        );
      toast.push({
        content: "successfully created",
        color: "alert-success",
      });
      if (createMore) {
        form = {
          allday: dayOption.options.allday,
          multiday: dayOption.options.multiday,
        };
      } else {
        goto("/");
      }
    }}
  >
    <h1 class="pb-2 text-xl">Create new event</h1>

    {@render TextInput("Name (required)", { name: "name", required: true })}
    {@render TextInput("Description", { name: "description" })}

    <div role="tablist" class="tabs tabs-border">
      {#each DayOption as option, i (i)}
        <input
          type="radio"
          class="tab"
          value={option}
          aria-label={option.label}
          bind:group={dayOption}
        />
      {/each}
    </div>

    <fieldset
      class="fieldset bg-base-100 border-base-300 flex-col gap-4 rounded-xl border p-4"
    >
      <legend class="fieldset-legend">
        {#if form.multiday}Start{/if}
        Date
      </legend>
      <label class="fieldset-label">
        <input type="date" class="input" required bind:value={startDate.date} />
      </label>
      {#if !form.allday}
        <label class="fieldset-label">
          <input
            type="time"
            class="input"
            required
            bind:value={startDate.time}
          />
          Start
        </label>
        {#if !form.multiday}
          <label class="fieldset-label">
            <input type="time" class="input" bind:value={endDate.time} />
            End (optional)
          </label>
        {/if}
      {/if}
    </fieldset>
    {#if form.multiday}
      <fieldset
        class="fieldset bg-base-100 border-base-300 rounded-xl border p-4"
      >
        <legend class="fieldset-legend">End Date</legend>
        <label class="fieldset-label">
          <input type="date" class="input" required bind:value={endDate.date} />
        </label>
        {#if !form.allday}
          <label class="fieldset-label">
            <input type="time" class="input" bind:value={endDate.time} />
            End
          </label>
        {/if}
      </fieldset>
    {/if}
    <div class=" flex max-w-88 flex-row items-center gap-4 p-4">
      <label class="fieldset-label">
        <input type="checkbox" bind:checked={createMore} class="toggle" />
        <span>Create more</span>
      </label>
      <span class="flex-grow"></span>
      <button type="submit" class="btn btn-primary">Create</button>
    </div>
  </form>
  <EventInspector event={form} />
</main>

{#snippet TextInput(
  label: string,
  options: {
    name: keyof typeof form;
    required?: boolean;
  },
)}
  {@const { name, required } = options}
  <label class="floating-label">
    <span>{label}</span>
    <input
      {name}
      placeholder={label}
      pattern=".*[^ ].*"
      bind:value={form[name]}
      {required}
      class="input"
    />
  </label>
  {@render Errors(errors?.[name])}
{/snippet}
{#snippet Errors(errors: string | string[] | undefined)}
  <p class="fieldset-label text-error">{errors}</p>
{/snippet}
