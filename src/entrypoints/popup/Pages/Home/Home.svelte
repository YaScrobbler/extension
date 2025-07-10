<script lang="ts">
  import Header from "@/lib/Header.svelte";
  import { messanger } from "@/lib/core/messanger";
  import type { YaMusicTrackInfo } from "@/lib/core/interfaces";
  import Track from "./Track.svelte";
  import { lastFmToken } from "@/lib/storage/token";

  let track: YaMusicTrackInfo | undefined = $state();
  let isLastfmSessionHere = $state(false);

  async function checkSession() {
    isLastfmSessionHere = (await lastFmToken.get()) !== null;
  }

  onMount(() => {
    checkSession();
    return messanger.onMessage("updateBackgroundTrack", ({ data }) => {
      track = data;
    });
  });

  messanger.sendMessage("getCurrentTrack").then((data) => {
    track = data;
  });
</script>

<div class="flex flex-col h-full">
  <Header />
  {#if !isLastfmSessionHere}
  <div class="p-2">
    <div role="alert" class="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Подключите аккаунт Last.fm в секции настроек</span>
    </div>
  </div>
  {/if}

  {#if track === undefined}
    <div class="flex-1 flex items-center justify-center">
      <p class="text-lg">Нет играющего трека</p>
    </div>
  {:else}
    <Track {track} />
  {/if}
</div>
