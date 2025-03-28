<script lang="ts">
  import PageHead from "+web/parts/PageHead.svelte";
  import { createClient } from "../client";
  const client = createClient({ fetch });

  let message = $state("No messages yet");
  let count = $state(0);
  let disabled = $state(false);

  async function get() {
    disabled = true;
    const res = await client.hello.$get();
    if (!res.ok) {
      disabled = false;
      throw new Error(
        `bad status ${res.status} with text: \`${await res.text()}\``,
      );
    }
    const json = await res.json();
    message = json.message;
    count = json.count;
    disabled = false;
  }

  async function delete_() {
    disabled = true;
    const res = await client.hello.$delete();
    if (!res.ok) {
      disabled = false;
      throw new Error(
        `bad status ${res.status} with text: \`${await res.text()}\``,
      );
    }
    const json = await res.json();
    message = json.message;
    count = json.count;
    disabled = false;
  }

  async function post() {
    disabled = true;
    const res = await client.hello.$post();
    if (!res.ok) {
      disabled = false;
      throw new Error(
        `bad status ${res.status} with text: \`${await res.text()}\``,
      );
    }
    const json = await res.json();
    message = json.message;
    count = json.count;
    disabled = false;
  }
</script>

<PageHead
  title="Sveltekit Project Template by ut.code();"
  thumbnail="/logos/svelte.png"
  description="a detailed description of this page"
/>

<div class="hero bg-base-200 min-h-screen">
  <div class="hero-content block">
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img
        src="/logos/svelte.svg"
        alt="svelte"
        width="400"
        class="mx-auto aspect-4/1 w-100 max-w-4/5"
      />
    </a>
    <h1 class="mt-5 text-center text-3xl font-bold sm:text-5xl">
      Welcome to Svelte
    </h1>
    <main class="mt-20 sm:mx-auto sm:w-md">
      <span class="my-10 block text-center text-3xl">{count}</span>
      <span class="my-10 block text-center text-xl font-extralight">
        {message}
      </span>
      <div class="flex flex-col-reverse justify-between gap-2 sm:flex-row">
        <button class="btn btn-error" onclick={delete_} {disabled}>
          DELETE
        </button>
        <button class="btn btn-primary" onclick={post} {disabled}>
          POST
        </button>
        <button class="btn btn-accent" onclick={get} {disabled}> GET </button>
      </div>
    </main>
  </div>
</div>
