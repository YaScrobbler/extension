// entrypoints/example.content.ts
export default defineContentScript({
  matches: ['*://*/*'],
  async main() {
    console.log('Injecting script...');
    await injectScript('/yamusic-main-world.js', {
      keepInDom: true,
    });
    console.log('Done!');
  },
});