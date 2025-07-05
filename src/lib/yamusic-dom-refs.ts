import { ensureElementDefined, queryAny } from "./core/dom";
import { second } from "./core/time";

export const getBottomBarRoot = () =>
    queryAny()<HTMLDivElement>
        ("[class*='PlayerBarDesktop_root']", "[class*='PlayerBarMobile_info']");

export const getTitleRoot = () =>
    queryAny(getBottomBarRoot())<HTMLAnchorElement | HTMLDivElement>
        ("[class*='Meta_titleContainer'] a", "[class*='Meta_titleContainer']");

export const getArtistsRoot = () =>
    queryAny(getBottomBarRoot())<HTMLDivElement>
        ("[class*='Meta_link']")

export const getTimecodeInput = () =>
    queryAny()<HTMLInputElement>
        ("[class*='ChangeTimecode_slider']");

export const getBottomBarRootEnsured = () => ensureElementDefined(getBottomBarRoot, 5 * second);

if (import.meta.env.DEV) {
    window.yascrobblerDebug = {
        ...window.yascrobblerDebug,
        getBottomBarRoot,
        getTitleRoot,
        getArtistsRoot,
        getTimecodeInput,
        getBottomBarRootEnsured
    }
}