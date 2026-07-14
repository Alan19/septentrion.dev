import {getDisplayFunction} from "./getDisplayOrder.ts";
import type {InferEntrySchema} from "astro:content";
import React, {useState} from "react";
import './skeleton.css'
import {SkeletonImage} from "./SkeletonImage.tsx";
import '../../pages/pages.css'

export function GalleryIsland(props: Readonly<{
    images: InferEntrySchema<"artworks">[];
    componentWidth: number;
    targetRowHeight: number;
    rowHeightTolerance?: number;
    itemSpacing?: number;
}>) {
    const {images, rowHeightTolerance = .15, targetRowHeight, componentWidth, itemSpacing = 16} = props;
    const [filter, setFilter] = useState('');

    const filteredImages = images.filter(value => !filter || value.tags.includes(filter));
    let [displayOrder, extraElement] = getDisplayFunction(filteredImages, componentWidth, rowHeightTolerance, targetRowHeight, itemSpacing);

    return <>
        <div className="field suffix border">
            <select value={filter} onChange={event => setFilter(event.target.value)}>
                {Array.from(Array.from(new Set(props.images.flatMap(value => value.tags))).map(value => <option key={value} value={value}>{value}</option>))}
            </select>
            <i>arrow_drop_down</i>
        </div>
        <div style={{display: "flex", flexDirection: "column", gap: itemSpacing}}>
            {displayOrder.map((value, index, array) => <div key={'row ' + index} style={{display: "flex", gap: itemSpacing}}>
                {value.map((imageEntry, _index, array) => <SkeletonImage key={imageEntry.id} array={array} imageEntry={imageEntry}/>)}
                {(index === array.length - 1) && !!(extraElement) && <div style={{flex: extraElement}}></div>}
            </div>)}
        </div>
    </>

}