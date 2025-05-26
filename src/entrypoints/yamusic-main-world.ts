import { YaMusicTrackInfo } from "@/lib/core/interfaces";
import { getBottomBarRootEnsured } from "@/lib/yamusic-dom-refs";

export default defineUnlistedScript(main);

function main(this: Window) {
  console.log("[yascrobbler]: initialized");
  initListeners({ onAudioStateChanged })
}

interface InitListenersProps {
  onAudioStateChanged: (trackInfo: YaMusicTrackInfo) => void
}

function onAudioStateChanged(trackInfo: YaMusicTrackInfo) {

}

async function initListeners({ onAudioStateChanged }: InitListenersProps) {
  const bottomBar = await getBottomBarRootEnsured();

  if (bottomBar === null) {
    throw new Error("Cannot access bottom bar to track current track.");
  }

}