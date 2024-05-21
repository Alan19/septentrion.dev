export enum ArtTag {
    featured = 'Featured',
    superhero = 'Superhero',
    bows = 'Bow',
    lances = 'Lances',
    knives = 'Knives',
    jupiter = 'Jupiter Form',
    techwear = 'Techwear',
    standardOutfit = 'Standard Outfit',
    bodysuit = 'Bodysuit',
    hoodie = 'Hoodie',
    castor = 'Castor',
    aicore = 'AICore Form',
    awakened = 'Gemini Form',
    ultra = 'Triangulum Form',
    thuban = 'Thuban Form',
    rastaban = 'Rastaban Form',
    eltanin = 'Eltanin Form',
    indra = 'Indra Suit',
    gungrir = 'Gungrir Suit',
    aldhibah = 'Aldhibah Form',
    icarus = 'Icarus Suit',
    tf = 'Transformation',
    eclipse = 'Eclipse Deity',
    vernal = 'Vernal',
    estival = 'Estival Checker',
    serotinal = 'Serotinal Circuitboard',
    autumnal = 'Autumnal Wavesniper',
    winter = 'Hibernal Assassin',
    aquarius = 'Aquarius Form',
    auriga = 'Auriga Form',
    hidden = 'Hidden',
    soma = 'Soma',
    wilton = 'Wilton',
    poslani = 'Poslani'
}

export type ImageInformation = {
    webp?: string;
    thumbnailUrl?: string;
    src: string;
    aspectRatio?: number;
    href: string;
    title: string;
    artist?: string;
    rows?: number;
    cols?: number;
    artistURL?: string;
    tags?: string[];
    published: string;
};

export type AltInformation = {
    webp?: string;
    src: string;
    thumbnailUrl?: string;
    aspectRatio?: number;
    href?: string;
    tags?: string[];
    parent: string;
}

export function isImageInformation(image: AltInformation | ImageInformation): image is ImageInformation {
    return (image as AltInformation).parent === undefined;
}

export function isAltInformation(image: AltInformation | ImageInformation): image is AltInformation {
    return (image as AltInformation).parent !== undefined;
}

export const tagGroup: Record<string, ArtTag[]> = {
    Clothing: [ArtTag.bodysuit, ArtTag.hoodie, ArtTag.autumnal, ArtTag.serotinal, ArtTag.vernal, ArtTag.estival, ArtTag.winter, ArtTag.standardOutfit, ArtTag.techwear],
    Class: [ArtTag.thuban, ArtTag.rastaban, ArtTag.eltanin, ArtTag.awakened, ArtTag.ultra, ArtTag.eclipse]
}