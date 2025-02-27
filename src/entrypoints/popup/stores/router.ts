import { isRoute, Route, Routes } from "@/lib/navigation/routes.enum";
import { writable } from "svelte/store";

export function createRouter() {
  const ROUTE_KEY = "local:route_key";
  const { subscribe, set } = writable<Route>(Routes.Home);

  storage.getItem(ROUTE_KEY).then((routeStorage) => {
    if (routeStorage === undefined) {
      storage.setItem(ROUTE_KEY, Routes.Home);
    } else if (isRoute(routeStorage)) {
      set(routeStorage);
    }
  });

  return {
    subscribe,
    set(val: Route) {
      set(val)
      storage.setItem(ROUTE_KEY, val);
    },
  }
}