import { YaMusicTrackInfo } from "./interfaces";

export abstract class AbstractScrobbler {
    abstract scrobble(musicInfo: YaMusicTrackInfo): void
}