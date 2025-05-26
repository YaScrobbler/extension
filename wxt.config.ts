import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
  manifest: {
    default_locale: "ru",
    permissions: ["storage"],
    host_permissions: ['https://*.music.yandex.*/*'],
    web_accessible_resources: [
      {
        resources: ["yamusic-main-world.js"],
        matches: ["https://music.yandex.ru/*", "https://music.yandex.com/*"],
      }
    ]
  },
  vite: () => {
    return { plugins: [tailwindcss()] }
  }
});
