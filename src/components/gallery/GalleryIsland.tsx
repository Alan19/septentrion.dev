import type {ImageInformation} from "../../util/images.ts";
import {getDisplayFunction} from "./getDisplayOrder.ts";
import {BASE_URL} from "../../util/consts.ts";

export function GalleryIsland(props: Readonly<{
    images: ImageInformation[];
    componentWidth: number;
    targetRowHeight: number;
    rowHeightTolerance?: number;
    itemSpacing?: number
}>) {
    const {images, rowHeightTolerance = .15, targetRowHeight, componentWidth, itemSpacing = 16} = props;
    let [displayOrder, extraElement] = getDisplayFunction(images, componentWidth, rowHeightTolerance, targetRowHeight, itemSpacing);

    return <div style={{display: "flex", flexDirection: "column", gap: itemSpacing}}>
        {displayOrder.slice(0, 16).map((value, index, array) => <div key={'row ' + index} style={{display: "flex", gap: itemSpacing}}>
            {value.map((imageEntry, _index, array) => <a style={{display: "contents"}} href={`${BASE_URL}/gallery/${imageEntry.id}`} key={imageEntry.id}>
                <img className={"no-round"} src={imageEntry.webp} style={{flex: array.length === 1 ? 1 : imageEntry.aspectRatio, width: "100%", viewTransitionName: `img-${imageEntry.id}`, borderRadius: "0 !important"}}/>
            </a>)}
            {(index === array.length - 1) && !!(extraElement) && <div style={{flex: extraElement}}></div>}
        </div>)}
    </div>

}