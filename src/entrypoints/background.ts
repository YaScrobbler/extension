import { YaMusicTrackInfo } from "@/lib/core/interfaces";
import { logger } from "@/lib/core/logger";
import { messanger } from "@/lib/core/messanger";

export default defineBackground(() => {
  let currentTrack: YaMusicTrackInfo;

  messanger.onMessage("getCurrentTrack", () => {
    logger.info("[getCurrentTrack]");
    return currentTrack;
  })

  messanger.onMessage("updateBackgroundTrack", ({ data }) => {
    logger.info("[updateBackgroundTrack]", data);
    currentTrack = data;
  })
});
