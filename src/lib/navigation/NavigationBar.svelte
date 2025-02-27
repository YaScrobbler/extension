<script lang="ts">
  import { BookHeart, Home, Settings } from "@/lib/icons";
  import { Routes } from "./routes.enum";

  interface Props {
    route: keyof typeof Routes;
  }

  let { route = $bindable(Routes.Home) }: Props = $props();
</script>

<div class="dock -mb-1">
  <button
    class:dock-active={route === Routes.Home}
    class="mb-0"
    onclick={() => (route = Routes.Home)}
  >
    <Home />
    <span class="dock-label pb-2">{browser.i18n.getMessage("home")}</span>
  </button>

  <button
    class:dock-active={route === Routes.About}
    class="mb-0"
    onclick={() => (route = Routes.About)}
  >
    <BookHeart />
    <span class="dock-label pb-2">{browser.i18n.getMessage("about")}</span>
  </button>

  <button
    class:dock-active={route === Routes.Settings}
    class="mb-0"
    onclick={() => route = Routes.Settings }
  >
    <Settings />
    <span class="dock-label pb-2">{browser.i18n.getMessage("settings")}</span>
  </button>
</div>
