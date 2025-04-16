import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), Icons({ compiler: "svelte" })],
  server: {
    port: 3000,
  },
  cacheDir: "../node_modules",
});
