import {Rating} from "./gallery/TagUtils";

interface ImageBase {
    tags: string[];
    webp?: string;
    src: string;
    thumbnailUrl?: string;
    rating: Rating;
    aspectRatio: number;
    href?: string;
    characters: string[]
}

export interface ImageInformation extends ImageBase {
    title: string;
    published: string;
    artist: string;
}

export interface AltInformation extends ImageBase {
    parent: string;
}

export type ImageEntry = AltInformation | ImageInformation;

export function isImageInformation(image: ImageEntry): image is ImageInformation {
    return (image as AltInformation).parent === undefined;
}

export function isAltInformation(image: ImageEntry): image is AltInformation {
    return (image as AltInformation).parent !== undefined;
}

