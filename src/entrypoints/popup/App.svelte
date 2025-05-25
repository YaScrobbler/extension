<script lang="ts">
  import NavigationBar from "@/lib/navigation/NavigationBar.svelte";
  import { createRouter } from "./stores/router";
  import { Routes } from "@/lib/navigation/routes.enum";
  import { About, Home, Settings } from "./Pages";

  const route = createRouter();

  const routes = {
    [Routes.Home]: Home,
    [Routes.About]: About,
    [Routes.Settings]: Settings,
  } as const;
</script>

<main class="w-full h-full">
  <div class="h-[calc(100%-60px)] overflow-auto">
    <svelte:component this={routes[$route]} />
  </div>
  <NavigationBar bind:route={$route} />
</main>
