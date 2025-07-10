import { md5 } from "js-md5"
import { encodeQueryParams } from "./core/url";

export class LastFmTracksAPI {
    readonly baseURL = "http://ws.audioscrobbler.com/2.0";

    constructor(
        public readonly api_key: string,
        public readonly token: string,
    ) { }


    getSignature(method: string): string {
        return md5("api_key" + this.api_key + "method" + method + "token" + this.token)
    }

    async getToken() {
        const url = new URL(this.baseURL);

        encodeQueryParams({
            method: "auth.getSession",
            format: "json",
            token: this.token,
            api_key: this.api_key,
            api_sig: this.getSignature("auth.getSession")
        }, url);

        const secret = await fetch(url).then(it => it.json());

        console.log(secret);
    }
}