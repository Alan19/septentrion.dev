export enum ArtTag {
    featured = 'Featured',
    superhero = 'Superhero',
    bows = 'Bow',
    lances = 'Lances',
    knives = 'Knives',
    zinogre = 'Zinogre Form',
    techwear = 'Techwear',
    standardOutfit = 'Standard Outfit',
    bodysuit = 'Bodysuit',
    hoodie = 'Hoodie',
    castor = 'Castor',
    aicore = 'AICore Form',
    awakened = 'M⬡ Form',
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
    aquarius = 'Aquarius Form'
}

export type ImageData = {
    src: string;
    href: string;
    title?: string;
    artist?: string;
    rows?: number;
    cols?: number;
    artistURL?: string;
    tags?: string[];
    published?: string;
    thumbnailUrl?: string;
}