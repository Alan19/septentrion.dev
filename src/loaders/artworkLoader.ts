import type {DataStore, Loader} from "astro/loaders";
import fs from "node:fs";
import path from "node:path";
import {type AltInformation, type ImageEntry, type ImageInformation, isAltInformation, isImageInformation} from "../util/images.ts";
import {globbySync} from "globby";

// TODO Clean up types
function loadImages(store: DataStore, generateDigest: (data: (Record<string, unknown> | string)) => string) {
    console.log("Reloading images!")
    const artworkFiles = globbySync(
        ['**/*.json'],
        {cwd: './src/content'}
    );
    const images = artworkFiles.flatMap(value => (JSON.parse(fs.readFileSync(path.join('src/content', value)).toString()) as ImageEntry[]));
    const alts = images.filter(value => isAltInformation(value));
    let parentImages: (ImageInformation & {
        alts: AltInformation[]
    })[] = images.filter(value => isImageInformation(value)).map(value => ({...value, alts: []}));
    parentImages = parentImages.toSorted((a, b) => a.published.localeCompare(b.published)).map((value, index) => ({
        ...value,
        commissionNumber: index + 1
    }));
    alts.forEach(value => parentImages.find(parent => parent.title === value.parent)?.alts.push(value))
    store.clear();
    parentImages.forEach(value => store.set({
        id: value.id,
        data: value as unknown as Record<string, unknown>,
        digest: generateDigest(value as unknown as Record<string, unknown>),
    }))
}

export const ArtworkLoader = (): Loader => ({
    name: "get-artwork-from-content",
    load: async ({generateDigest, store, watcher}) => {

        const artworkFiles = globbySync(
            ['**/*.json'],
            {cwd: './src/content'}
        );

        if (watcher) {
            watcher.add('./src/content/gallery/**/*.json');
            watcher.on('all', (_event, path) => {
                if (artworkFiles.filter(value => path.endsWith(value)).length) {
                    loadImages(store, generateDigest);
                }
            })
        }
        loadImages(store, generateDigest);
    }
});