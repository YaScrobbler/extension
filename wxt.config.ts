import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';
import { yaMusicURLs } from './yamusic.urls';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
  manifest: {
    default_locale: "ru",
    permissions: ["storage"],
    host_permissions: yaMusicURLs,
    web_accessible_resources: [
      {
        resources: ["yamusic-main-world.js"],
        matches: yaMusicURLs,
      }
    ]
  },
  vite: () => {
    return { plugins: [tailwindcss()] }
  }
});
