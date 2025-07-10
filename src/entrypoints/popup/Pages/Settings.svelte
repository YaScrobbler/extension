<script lang="ts">
    import { logger } from "@/lib/core/logger";
    import { LastFmTracksAPI } from "@/lib/lastfm.api";
    import { lastFmToken } from "@/lib/storage/token";
    import Track from "./Home/Track.svelte";

    const link = "https://example.com/";

    const token = "948a7e62bb988bd9a53de7bbfb8e9b9d";

    const tokenLink =
        "http://www.last.fm/api/auth/?api_key=" + token + "&cb=" + link;
    
    let userToken = $state("");
    
    async function saveToken() {
        lastFmToken.save(userToken);
    }
    
    async function test() {
        const result = await lastFmToken.get();

        if(result === null) {
            logger.warn("Last.fm token is not defined for testing");
            return;
        }

        const tracksAPI = new LastFmTracksAPI(token, result)

        console.log(await tracksAPI.getToken())
    }
</script>

<div class="p-2 flex flex-col gap-y-2">
    <div role="alert" class="alert alert-success flex flex-col">
        <span>После предоставления разрешения в открывшейся вкладке скопируйте токен из URL, который начинается после знака =</span>
        <span>Например, https://example.com/?token=token_here , где токен это token_here</span>
    </div>
    <button
        class="btn w-full"
        onclick={() => {
            window.open(tokenLink, "_blank");
        }}
    >
        Получить токен через URL
    </button>

    <fieldset class="fieldset">
        <legend class="fieldset-legend">Токен от Last.FM</legend>
        <input bind:value={userToken} type="text" class="input w-full" placeholder="Введите токен" />
        <button class="btn" onclick={saveToken}>Сохранить токен</button>
    </fieldset>

    <button class="btn w-full" onclick={test}>
        test call
    </button>
</div>
