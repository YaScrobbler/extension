import { yaMusicURLs } from "@@/yamusic.urls";
import { YaMusicTrackInfo } from "@/lib/core/interfaces";
import * as yaDOM from "@/lib/yamusic-dom-refs";
import { logger } from "@/lib/core/logger";
import { second } from "@/lib/core/time";
import { sleep } from "@/lib/core/async";
import { messanger } from "@/lib/core/messanger";

// entrypoints/example.content.ts
export default defineContentScript({
  matches: yaMusicURLs,
  main
});

type MusicEvent = "stopped" | "playing" | "track_changed";

function onAudioStateChanged(event: MusicEvent, trackInfo: YaMusicTrackInfo) {
  logger.info("[onAudioStateChanged]", { event, trackInfo });
  messanger.sendMessage("updateBackgroundTrack", trackInfo);
}

function main(this: Window) {
  const mediaQueryList = window.matchMedia("(max-width: 768px)");

  let attempt = 0;
  let abortController: AbortController;

  async function init() {
    logger.info("Initializing..");

    if (abortController) abortController.abort();

    abortController = new AbortController();

    try {
      await initListeners({ onAudioStateChanged, abortController })

      logger.success("Successfully init injected script.");
      attempt = 0;
    } catch (error) {
      logger.error("Cannot inject listeners.\n", error);

      if (attempt <= 10) {
        attempt++;
        await sleep(200);
        init();
        return;
      }

      logger.error("limit 10 attempts to inject listeners over");
    }
  }

  mediaQueryList.addEventListener('change', async (...args) => {
    // a small wait for rerender screen
    await sleep(100);

    logger.debug("[mediaQueryList]", args);

    init();
  });

  init();
}

interface InitListenersProps {
  onAudioStateChanged: (event: MusicEvent, trackInfo: YaMusicTrackInfo) => void,
  abortController: AbortController
}

async function initListeners({ onAudioStateChanged, abortController }: InitListenersProps) {
  const bottomBar = await yaDOM.getBottomBarRootEnsured();

  if (bottomBar === null) {
    throw new Error("Cannot access bottom bar to track current track.");
  }

  const titleRoot = await yaDOM.getTitleRootEnsured();
  const playButton = await yaDOM.getPlayButtonEnsured();

  // not ensured, because of artist can be not defined. see
  // https://music.yandex.ru/album/131503/track/1223498
  const artistRoot = yaDOM.getArtistsRoot();

  logger.debug("initListeners", { titleRoot, playButton, artistRoot });

  for (const [k, v] of Object.entries({ titleRoot, playButton })) {
    if (v === null) {
      logger.error(`Cannot find ${k} that need to be observed`);
      throw new Error("Not observable error");
    }

    if (!v.isConnected) {
      logger.error(`The element ${k} - ${v} is not connected to DOM`);
      throw new Error("Not observable error");
    }
  }

  // because of "react" there's no node update when track changed, but title till the same
  // so we have to check artists and title in the same time
  // but we also shouldn't call track update twice when title & artists changed
  // so we have to track delta between updating title & artists to compare them

  const maxDelta = 3 /* ms */;
  let titleUpdateTime = Date.now();
  let artistsUpdateTime = Date.now();

  const titleMutationObserver = new MutationObserver(() => {
    titleUpdateTime = Date.now();
    const d = titleUpdateTime - artistsUpdateTime;

    if (d < maxDelta) {
      logger.info(`[titleMutationObserver] title updated with artists, breaking send "track_changed", d = ${d}`);
      return;
    }

    if (!artistRoot) {
      // artist root can be not defined. see
      // https://music.yandex.ru/album/131503/track/1223498
      abortController.abort();
    }

    onAudioStateChanged("track_changed", getTrackInfo());
  });

  const artistsMutationObserver = new MutationObserver(() => {
    artistsUpdateTime = Date.now();
    const d = artistsUpdateTime - titleUpdateTime;

    if (d < maxDelta) {
      logger.info(`[artistsMutationObserver] artists updated with title, breaking send "track_changed", d = ${d}`);
      return;
    }
  });

  const playButtonMutationObserver = new MutationObserver(() => {
    onAudioStateChanged(yaDOM.isPlaybuttonEnabled(playButton!) ? "playing" : "stopped", getTrackInfo());
  });

  abortController.signal.addEventListener('abort', () => {
    logger.info("[initListeners]: Aborted. Disconnect listeners.");
    titleMutationObserver.disconnect();
    artistsMutationObserver.disconnect();
    playButtonMutationObserver.disconnect();
  })

  titleMutationObserver.observe(titleRoot!, { characterData: true, subtree: true });
  playButtonMutationObserver.observe(playButton!, { attributeFilter: ['aria-label'] });

  if (artistRoot) {
    // artist root can be not defined. see
    // https://music.yandex.ru/album/131503/track/1223498
    artistsMutationObserver.observe(artistRoot, { childList: true });
  }
}

function getTrackInfo(): YaMusicTrackInfo {
  const artistsRoot = yaDOM.getArtistsRoot();

  const artists: string[]
    = artistsRoot
      ?.querySelectorAll("span")
      .entries()
      .map(([_, span]) => span.innerText)
      .toArray() ?? ["Незивестен"];

  const imageSize = /\/(\d+x\d+)/;

  const cover = (() => {
    const cover = yaDOM.getCover();

    if (cover) {
      return cover.src.replace(imageSize, "/400x400");
    }
  })();

  const input = yaDOM.getTimecodeInput();

  if (input === undefined) {
    throw new Error("Input is not found");
  }

  const duration = Number(input.max) * second;
  const currentProgress = Number(input.value) * second;

  const titleRoot = yaDOM.getTitleRoot()!;
  const track = titleRoot.innerText;

  const url = titleRoot instanceof HTMLAnchorElement ? titleRoot.href : undefined;

  return {
    artists,
    cover,
    duration,
    timestamp: Date.now() - currentProgress,
    track,
    url
  }
}