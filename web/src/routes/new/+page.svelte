<script lang="ts">
  import { enhance } from "$app/forms";
  import { InsertEvent } from "+server/validator/schema.ts";
  import { Control, Field, FieldErrors, Label } from "formsnap";
  import SuperDebug, { dateProxy, superForm } from "sveltekit-superforms";
  import { valibotClient } from "sveltekit-superforms/adapters";

  const { data } = $props();
  const form = superForm(data.form, {
    validators: valibotClient(InsertEvent),
  });
  const { form: formData } = form;

  const date = dateProxy(formData, "date", {});
  $inspect($date);
</script>

<form method="POST" use:enhance class="mx-auto flex max-w-md flex-col gap-2">
  <h1 class="text-xl">Create Event</h1>
  <Field {form} name="name">
    <Control>
      {#snippet children({ props })}
        <Label class="floating-label mt-4">
          <span>Name</span>
          <input
            {...props}
            class="input w-full"
            placeholder="Name"
            bind:value={$formData.name}
            required
          />
        </Label>
      {/snippet}
    </Control>
    <FieldErrors class="fieldset-label text-error" />
  </Field>
  <Field {form} name="description">
    <Control>
      {#snippet children({ props })}
        <Label class="floating-label mt-4">
          <span>Description</span>
          <input
            {...props}
            class="input w-full"
            placeholder="Description"
            bind:value={$formData.description}
            required
          />
        </Label>
      {/snippet}
    </Control>
    <FieldErrors class="fieldset-label text-error" />
  </Field>
  <Field {form} name="date">
    <Control>
      {#snippet children({ props })}
        <Label class="floating-label mt-4">
          <span>Date</span>
          <input
            {...props}
            type="date"
            class="input w-full"
            placeholder="Date"
            bind:value={$date}
            required
          />
        </Label>
      {/snippet}
    </Control>
    <FieldErrors class="fieldset-label text-error" />
  </Field>
  <button type="submit" class="btn btn-small">Create</button>
</form>
<SuperDebug data={$formData} />
