import {getDisplayFunction} from "./getDisplayOrder.ts";
import type {InferEntrySchema} from "astro:content";
import {BASE_URL} from "../../util/consts.ts";
import '../../pages/pages.css';
import '../../pages/gallery/artwork/artwork.css';
import {Rating, ratingToNumber} from "../../util/rating.ts";

export function FilteredGallery({componentWidth, images, itemSpacing = 8, rowHeightTolerance = .15, targetRowHeight}: Readonly<{
    images: InferEntrySchema<"artworks">[];
    componentWidth: number;
    targetRowHeight: number;
    rowHeightTolerance?: number;
    itemSpacing?: number;
}>) {
    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const artist = searchParams.get('artist');
    const character = searchParams.get('character');
    const rating = searchParams.get('rating');
    let [displayOrder, extraElement] = getDisplayFunction(images.filter(value => filterImages(value)), componentWidth, rowHeightTolerance, targetRowHeight, itemSpacing);
    return <div style={{display: "flex", flexDirection: "column", gap: itemSpacing}}>
            {displayOrder.map((value, index, array) => <div style={{display: "flex", gap: itemSpacing}}>
                {value.map((imageEntry, _index, array) =>
                    <div style={{flex: (array.length === 1 ? 1 : imageEntry.aspectRatio)}}>
                        <a style={{display: "contents"}} href={`${BASE_URL}/gallery/artwork/${imageEntry.id}`} className="image-link">
                            <div className={"skeleton"} style={{aspectRatio: imageEntry.aspectRatio}}>
                                <img src={imageEntry.webp} className={"primary-border border no-round"} style={{width: "100%", height: 'auto', viewTransitionClass: "gallery-img", viewTransitionName: `img-${imageEntry.id}`}}/>
                            </div>
                        </a>
                    </div>)}
                {(index === array.length - 1) && !!(extraElement) &&
                    <div style={{flex: extraElement}}></div>}
            </div>)}
        </div>

    function filterImages(value: InferEntrySchema<"artworks">): boolean {
        return (!artist || artist === value.artist) && (!character || value.characters.includes(character)) && (!rating || ratingToNumber(value.rating) <= ratingToNumber(rating as Rating))
    }
}