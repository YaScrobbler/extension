import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';
import { yaMusicURLs } from './yamusic.urls';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
  manifest: {
    default_locale: "ru",
    permissions: ["storage", "nativeMessaging", "tabs"],
    host_permissions: yaMusicURLs,
    "externally_connectable": {
      matches: yaMusicURLs
    }
  },
  webExt: {
    startUrls: ["https://music.yandex.ru/"],
    keepProfileChanges: true,
    chromiumProfile: "./.wxt/chrome-data",
  },
  vite: () => {
    return { plugins: [tailwindcss()] }
  }
});
