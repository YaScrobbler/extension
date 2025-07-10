<script lang="ts">
    import type { YaMusicTrackInfo } from "@/lib/core/interfaces";
    import type { HTMLAttributes } from "svelte/elements";
    import cassete from "./cassette.webp";

    type Props = { track: YaMusicTrackInfo } & HTMLAttributes<HTMLDivElement>;

    const { track, ...rest }: Props = $props();
</script>

<div {...rest} class={["px-2", rest.class]}>
    <div class="flex items-center">
        <img class="size-16 rounded-xl" src={track.cover ? track.cover.replaceAll("400x400", "200x200") : cassete} alt="">
        <div class="ml-4 flex flex-col">
            <a href={track.url} class="font-semibold text-sm">
                {track.track}
            </a>
            <p>
                {track.artists.join(", ")}
            </p>
        </div>
    </div>
</div>
