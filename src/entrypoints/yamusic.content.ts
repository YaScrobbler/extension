import { logger } from "@/lib/core/logger";
import { yaMusicURLs } from "@@/yamusic.urls";

// entrypoints/example.content.ts
export default defineContentScript({
  matches: yaMusicURLs,
  async main() {
    logger.info('Injecting script...');
    try {
      await injectScript('/yamusic-main-world.js', {
        keepInDom: true,
      });
    } catch(error) {
      logger.error("Script wasn't injected succesfully. Error: ", error)
    }
  },
});