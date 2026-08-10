import type {Loader} from "astro/loaders";
import fs from "node:fs";
import path from "node:path";
import {type AltInformation, type ImageEntry, type ImageInformation, isAltInformation, isImageInformation} from "../util/images.ts";

export const ArtworkLoader = (): Loader => ({
    name: "get-artwork-from-content",
    load: async ({generateDigest, store}) => {
        const images = fs.readdirSync('src/content/gallery/').flatMap(value => (JSON.parse(fs.readFileSync(path.join('src/content/gallery', value)).toString()) as ImageEntry[]));
        const alts = images.filter(value => isAltInformation(value));
        let parentImages: (ImageInformation & { alts: AltInformation[] })[] = images.filter(value => isImageInformation(value)).map(value => ({...value, alts: []}));
        parentImages = parentImages.toSorted((a, b) => a.published.localeCompare(b.published)).map((value, index) => ({...value, commissionNumber: index + 1}));
        alts.forEach(value => parentImages.find(parent => parent.title === value.parent)?.alts.push(value))
        parentImages.forEach(value => store.set({
            id: value.id,
            data: value as unknown as Record<string, unknown>,
            digest: generateDigest(value as unknown as Record<string, unknown>),
        }))
    }
});