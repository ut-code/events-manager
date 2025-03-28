// if you don't use cloudflare, use another adapter from sveltekit
import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type import("@sveltejs/kit").Config */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      "+server": "../server",
      "+share": "../share",
      "+web/*": "./src/*",
    },
  },
};

export default config;
