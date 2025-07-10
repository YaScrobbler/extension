import { YaMusicTrackInfo } from "@/lib/core/interfaces";
import { logger } from "@/lib/core/logger";
import { messanger } from "@/lib/core/messanger";
import { lastFmToken } from "@/lib/storage/token";
import { LastFMTrack } from "lastfm-ts-api";

export default defineBackground(() => {
  let currentTrack: YaMusicTrackInfo;

  messanger.onMessage("getCurrentTrack", () => {
    logger.info("[getCurrentTrack]");
    return currentTrack;
  })

  messanger.onMessage("updateBackgroundTrack", async ({ data }) => {
    logger.info("[updateBackgroundTrack]", data);
    currentTrack = data;

    const token = await lastFmToken.get();

    if (token === null) {
      return
    }

    scrobble(token, data);
  })
});

async function scrobble(session: string, track: YaMusicTrackInfo) {
  console.log(import.meta.env.VITE_LASTFM_TOKEN);

  const prepared = {
    artist: track.artists.join(", "),
    timestamp: track.timestamp,
    track: track.track,
    duration: track.duration,
  };
}