// a list of refs dom elements to observe of yandex music

import { sleep } from "./async";
import { second } from "./time";

export const queryAny = (node: ParentNode = document) =>
    <T extends Element>(...queries: string[]) =>
        queries.map(it => node.querySelector<T>(it)).find(node => node !== null);

export async function ensureElementDefined<T extends Object>(elementGetter: () => T | undefined | null, timeoutMs: number = 5 * second): Promise<T | null> {
    const timeout = Date.now() + timeoutMs;

    while (timeout > Date.now()) {
        const result = elementGetter();
        
        if (result) {
            return result;
        }

        await sleep(200);
    }

    return null;
}

if (import.meta.env.DEV) {
    window.yascrobblerDebug = {
        ...window.yascrobblerDebug,
        queryAny,
        ensureElementDefined
    }
}