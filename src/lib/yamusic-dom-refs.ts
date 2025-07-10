import { ensureElementDefined, queryAny } from "./core/dom";

export const getBottomBarRoot = () =>
    queryAny()<HTMLDivElement>
        ("[class*='PlayerBarDesktopWithBackgroundProgressBar']", "[class*='PlayerBarMobile_root']");

export const getTitleRoot = () =>
    queryAny(getBottomBarRoot())<HTMLAnchorElement | HTMLDivElement>
        ("[class*='Meta_titleContainer'] a", "[class*='Meta_titleContainer']");

export const getArtistsRoot = () =>
    queryAny(getBottomBarRoot())<HTMLDivElement>
        ("[class*='SeparatedArtists_root']")

export const getTimecodeInput = () =>
    queryAny(getBottomBarRoot())<HTMLInputElement>
        ("input");

export const getPlayButton = () =>
    queryAny(getBottomBarRoot())<HTMLButtonElement>
        ("button[aria-label='Пауза']", "button[aria-label='Воспроизведение']");

export const getCover = () =>
    queryAny(getBottomBarRoot())<HTMLImageElement>
        ("img");

const pauseAriaLabels = ["Пауза"];

export function isPlaybuttonEnabled(playbutton: HTMLButtonElement): boolean {
    const ariaLabelAttr = playbutton.getAttribute("aria-label");

    if (ariaLabelAttr !== null) {
        return pauseAriaLabels.includes(playbutton.getAttribute("aria-label") || "")
    }

    throw new TypeError("Expected a button with aria-label attribute");
}

export const getBottomBarRootEnsured = () => ensureElementDefined(getBottomBarRoot);
export const getTitleRootEnsured = () => ensureElementDefined(getTitleRoot);
export const getArtistsRootEnsured = () => ensureElementDefined(getArtistsRoot);
export const getPlayButtonEnsured = () => ensureElementDefined(getPlayButton);

if (import.meta.env.DEV) {
    window.yascrobblerDebug = {
        ...window.yascrobblerDebug,
        getBottomBarRoot,
        getTitleRoot,
        getArtistsRoot,
        getTimecodeInput,
        getBottomBarRootEnsured,
        getPlayButton,
        getCover,
    }
}