import type {InferEntrySchema} from "astro:content";
import React, {useState} from "react";
import {BASE_URL} from "../../util/consts.ts";

export function SkeletonImage(props: Readonly<{ array: InferEntrySchema<"artworks">[], imageEntry: InferEntrySchema<"artworks"> }>) {
    const [loaded, setLoaded] = useState(false);

    return <div style={{flex: props.array.length === 1 ? 1 : props.imageEntry.aspectRatio}}>
        <a style={{display: "contents"}} href={`${BASE_URL}/gallery/${props.imageEntry.id}`}>
            <div className={!loaded ? "skeleton" : ""} style={{aspectRatio: props.imageEntry.aspectRatio}}>
                <img alt={props.imageEntry.title} onLoad={() => setLoaded(true)} loading={"lazy"} className={"no-round"} src={props.imageEntry.webp} style={{width: "100%", viewTransitionName: `img-${props.imageEntry.id}`, viewTransitionClass: "gallery-img"}}/>
            </div>
        </a>
    </div>;
}