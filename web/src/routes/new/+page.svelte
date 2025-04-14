<script lang="ts">
  import { assert, flatten, safeParse } from "valibot";

  import { InsertEvent } from "+server/validator/schema.ts";
  import { createClient } from "+web/client";
  import { GetsetDatetime } from "+web/lib/GetsetDatetime.svelte";
  import { toastContext } from "+web/lib/toast/controller.svelte";

  const form: Partial<InsertEvent> = $state({});
  let errors: Record<string, string | string[] | undefined> | undefined =
    $state(undefined);

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

<main>
  <form
    class="item-end mx-auto mt-10 flex max-w-lg flex-col gap-2 pt-2"
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
      console.log("form", $state.snapshot(form));
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
    }}
  >
    <h1 class="pb-2 text-xl">Create new event</h1>

    {@render TextInput("Name (required)", { name: "name", required: true })}
    {@render TextInput("Description", { name: "description" })}
    <fieldset
      class="fieldset bg-base-100 border-base-300 rounded-xl border p-4"
    >
      <legend class="fieldset-legend">Date options</legend>
      <label class="fieldset-label">
        <input type="checkbox" class="toggle" bind:checked={form.allday} />
        <span class="select-none">All day event?</span>
      </label>
      <label class="fieldset-label">
        <input type="checkbox" class="toggle" bind:checked={form.multiday} />
        <span class="select-none">Does it span across multiple days?</span>
      </label>
    </fieldset>

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
            <input
              type="time"
              class="input"
              required
              bind:value={endDate.time}
            />
            End
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
            <input
              type="time"
              class="input"
              required
              bind:value={endDate.time}
            />
            End
          </label>
        {/if}
      </fieldset>
    {/if}
    <button type="submit" class="btn btn-primary mt-4">Create</button>
  </form>
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
