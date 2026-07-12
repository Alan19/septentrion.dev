import {getDisplayFunction} from "./getDisplayOrder.ts";
import {BASE_URL} from "../../util/consts.ts";
import type {InferEntrySchema} from "astro:content";

export function GalleryIsland(props: Readonly<{
    images:  InferEntrySchema<"artworks">[];
    componentWidth: number;
    targetRowHeight: number;
    rowHeightTolerance?: number;
    itemSpacing?: number
}>) {
    const {images, rowHeightTolerance = .15, targetRowHeight, componentWidth, itemSpacing = 16} = props;
    let [displayOrder, extraElement] = getDisplayFunction(images, componentWidth, rowHeightTolerance, targetRowHeight, itemSpacing);

    return <div style={{display: "flex", flexDirection: "column", gap: itemSpacing}}>
        {displayOrder.map((value, index, array) => <div key={'row ' + index} style={{display: "flex", gap: itemSpacing}}>
            {value.map((imageEntry, _index, array) => <div style={{flex: array.length === 1 ? 1 : imageEntry.aspectRatio}}><a style={{display: "contents"}} href={`${BASE_URL}/gallery/${imageEntry.id}`} key={imageEntry.id}>
                <img alt={imageEntry.title} loading={"lazy"} className={"no-round"} src={imageEntry.webp} style={{width: "100%", viewTransitionName: `img-${imageEntry.id}`, viewTransitionClass: "gallery-img"}}/>
            </a></div>)}
            {(index === array.length - 1) && !!(extraElement) && <div style={{flex: extraElement}}></div>}
        </div>)}
    </div>

}