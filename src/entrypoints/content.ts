export default defineContentScript({
  matches: ['*://*.music.yandex.*.*'],
  main() {
    console.log('Hello content.');
  },
});
