import { YaMusicTrackInfo } from "@/lib/core/interfaces";
import { getBottomBarRootEnsured } from "@/lib/yamusic-dom-refs";
import { logger } from "@/lib/core/logger";

export default defineUnlistedScript(main);

function main(this: Window) {
  logger.info("Initializing..");
  initListeners({ onAudioStateChanged })
    .then(() => {
      logger.success("Successfully init injected script.");
    })
    .catch((error) => {
      logger.error("Cannot inject listeners.\n", error);
    })
}

function onAudioStateChanged(trackInfo: YaMusicTrackInfo) {
  
}

interface InitListenersProps {
  onAudioStateChanged: (trackInfo: YaMusicTrackInfo) => void
}


async function initListeners({ onAudioStateChanged }: InitListenersProps) {
  const bottomBar = await getBottomBarRootEnsured();

  if (bottomBar === null) {
    throw new Error("Cannot access bottom bar to track current track.");
  }
  
  throw new Error("yooo. check the errors.")
}