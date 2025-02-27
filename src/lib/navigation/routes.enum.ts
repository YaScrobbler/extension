export type Route = keyof typeof Routes

const Routes = {
  Home: "Home",
  About: "About",
  Settings: "Settings",
} as const;

function isRoute(it: any): it is Route {
  return Object.keys(Routes).includes(it);
}

export { Routes, isRoute };