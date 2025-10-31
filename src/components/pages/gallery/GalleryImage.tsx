import type {ImageInformation} from "../../../../api/src/images/ImageInformation.ts";
import {SkeletonImage} from "./SkeletonImage.tsx";
import {Link} from "react-router-dom";

export function GalleryImage(props: { value: ImageInformation, searchParams: string, hasAlts?: boolean }) {
    return <SkeletonImage src={props.value.thumbnailUrl} skeletonStyle={{aspectRatio: props.value.aspectRatio}}>
        <Link to={{pathname: props.value.id, search: "?" + props.searchParams.toString()}} style={{display: "contents"}}>
            <img alt={props.value.title} src={props.value.thumbnailUrl}/>
            {props.hasAlts && <button className="absolute circle secondary-container" style={{right: 8, top: 8, opacity: .75}}>
                <i>more</i>
            </button>}
        </Link>
    </SkeletonImage>;
}