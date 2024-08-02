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

type Rating = 'general' | 'mainstream' | 'sensitive' | 'mature';

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

export interface ImageInformation extends ImageBase{
    title: string;
    published: string;
    artist?: string;
}

export interface AltInformation extends ImageBase{
    parent: string;
}

export type ImageEntry = AltInformation | ImageInformation;

export function isImageInformation(image: ImageEntry): image is ImageInformation {
    return (image as AltInformation).parent === undefined;
}

export function isAltInformation(image: ImageEntry): image is AltInformation {
    return (image as AltInformation).parent !== undefined;
}

export const tagGroup: Record<string, ArtTag[]> = {
    Clothing: [ArtTag.bodysuit, ArtTag.hoodie, ArtTag.autumnal, ArtTag.serotinal, ArtTag.vernal, ArtTag.estival, ArtTag.winter, ArtTag.standardOutfit, ArtTag.techwear],
    "Evolution Level": [ArtTag.thuban, ArtTag.rastaban, ArtTag.eltanin, ArtTag.awakened, ArtTag.ultra, ArtTag.eclipse],
    OCs: [ArtTag.poslani, ArtTag.soma, ArtTag.wilton, ArtTag.castor]
}