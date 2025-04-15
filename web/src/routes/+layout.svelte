<script lang="ts">
  import "../app.css";

  import { page } from "$app/state";
  import { ModalController } from "@/lib/modal/controller.svelte";
  import Modal from "@/lib/modal/provider.svelte";
  import { ToastController } from "@/lib/toast/controller.svelte";
  import Toast from "@/lib/toast/provider.svelte";
  import Header from "@/parts/Header.svelte";

  const toast = new ToastController();
  const modal = new ModalController();

  const { children } = $props();
</script>

<svelte:head>
  <meta property="og:site_name" content="Events Manager" />
  <meta property="og:url" content={page.url.toString()} />
</svelte:head>

<Header />
<Toast {toast} />
<Modal {modal} />
{@render children()}
