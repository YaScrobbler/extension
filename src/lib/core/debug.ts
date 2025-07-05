export {}

if (!import.meta.env.SSR) {
    window.yascrobblerDebug["traced"] = function(fn: () => void) {
        debugger;
        fn()
    }
}
