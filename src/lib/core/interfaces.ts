export interface YaMusicTrackInfo {
    track: string;
    artists: string[];
    cover?: string;

    /** duration in ms */
    duration: number;
    url?: string;

    /** The time the track started playing, in UNIX timestamp format (integer number of seconds since 00:00:00, January 1st 1970 UTC). This must be in the UTC time zone. */
    timestamp: number;
    chosenByUser?: 1 | 0;
}