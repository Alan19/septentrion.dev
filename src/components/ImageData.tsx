export enum ArtTag {
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
    awakened = 'Messier⬡ Form',
    ultra = 'Triangulum Form',
    thuban = 'Thuban Form',
    rastaban = 'Rastaban Form',
    eltanin = 'Eltanin Form',
    indra = 'Indra Suit',
    gungrir = 'Gungrir Suit',
    aldhibah = 'Aldhibah Form',
    icarus = 'Icarus Suit'
}

export type ImageData = {
    img: string;
    source: string;
    title?: string;
    author?: string;
    rows?: number;
    cols?: number;
    artistURL?: string;
    tags?: ArtTag[];
}