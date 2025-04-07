export enum Rating {
    Mainstream = 'mainstream',
    General = 'general',
    Sensitive = 'sensitive',
    Mature = 'mature'
}

export interface ImageBase {
    tags: string[];
    webp: string;
    src: string;
    nearLossless: string;
    thumbnailUrl: string;
    rating: Rating;
    aspectRatio: number;
    href?: string;
    characters: string[];
    id: string;
}

export function getParentImage(id: string, imageEntries: ImageEntry[]): ImageInformation | undefined {
    const entry = imageEntries.find(value => value.id === id);
    if (entry && isImageInformation(entry)) {
        return entry;
    } else {
        return imageEntries.filter(value => isImageInformation(value)).find(value => isImageInformation(value) && entry && isAltInformation(entry) && value.title === entry?.parent);
    }
}


export interface ImageInformation extends ImageBase {
    title: string;
    published: string;
    artist: string;
}

export type AltType = 'extra' | 'cropped' | 'recolor' | { altNumber?: number, pageNumber?: number };

export interface AltInformation extends ImageBase {
    parent: string;
    altType: AltType;
}

export function isAltTypeComplex(altType: AltType | undefined): altType is { altNumber?: number, pageNumber?: number } {
    return typeof altType === 'object';
}

export function getAltAndPageNumber(a: AltInformation) {
    return isAltTypeComplex(a.altType) ? a.altType : {pageNumber: 0, altNumber: 0};
}

export type ImageEntry = AltInformation | ImageInformation;

export function isImageInformation(image: ImageEntry): image is ImageInformation {
    return (image as AltInformation).parent === undefined;
}

export function isAltInformation(image: ImageEntry): image is AltInformation {
    return (image as AltInformation).parent !== undefined;
}

export function getHref(artist: string) {
    if (artist.startsWith('@')) {
        if (artist.includes('.')) {
            return `https://bsky.app/profile/${artist.substring(1)}`;
        } else {
            return `https://twitter.com/${artist?.substring(1)}`;
        }
    } else {
        return artist;
    }
}