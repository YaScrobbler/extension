import { AbstractScrobbler } from "../core/AbstractScrobbler";
import { YaMusicTrackInfo } from "../core/interfaces";
import { encodeQueryParams } from "../core/url";

export class LastFmScrobbler implements AbstractScrobbler {
    apiUrl = 'https://ws.audioscrobbler.com/2.0/' as const;
    apiKey = 'a1bb34c4ac03b73bc706b25867e84cfb' as const;
    method = 'track.scrobble' as const;

    constructor(readonly SESSION_KEY: string) {
        
    }

    scrobble(musicInfo: YaMusicTrackInfo): void {
        const url = new URL(this.apiUrl);
        

        encodeQueryParams({ method: this.method }, url);
    }
}