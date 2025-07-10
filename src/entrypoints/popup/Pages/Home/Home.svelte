<script lang="ts">
  import Header from "@/lib/Header.svelte";
  import { messanger } from "@/lib/core/messanger";
  import type { YaMusicTrackInfo } from "@/lib/core/interfaces";
  import Track from "./Track.svelte";

  let track: YaMusicTrackInfo | undefined = $state();

  onMount(() => {
    return messanger.onMessage("updateBackgroundTrack", ({ data }) => {
      track = data;
    })
  })

  messanger.sendMessage("getCurrentTrack").then(data => {
    track = data;
  })
</script>

<div class="flex flex-col h-full">
  <Header />
  {#if track === undefined}
    <div class="flex-1 flex items-center justify-center">
      <p class="text-lg">Нет играющего трека</p>
    </div>
  {:else}
    <Track {track} />
  {/if}
</div>
