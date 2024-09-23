import {atom} from 'jotai';
import {Wrappalyzer} from "src/types/services/wrappalyzer";

export const clientIdAtom = atom<string | null>(null);
export const clientStatusAtom = atom<{ url: string, status: string, result: any} | null>(null);
export const technologiesAtom = atom<Wrappalyzer>([]);
export const screenshotAtom = atom<{path: string} | null>(null);

export const isTechnologiesLoadingAtom = atom<boolean>(false);
export const isScreenshotLoadingAtom = atom<boolean>(false);