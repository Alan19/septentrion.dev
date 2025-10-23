import {useTagHooks} from "../../../hooks/useTagHooks.ts";
import {useParams} from "react-router";
import {Container} from "../../ui/Container.tsx";
import {clsx} from "clsx";
import {Link, useSearchParams} from "react-router-dom";
import {type ImageInformation, isAltInformation} from "../../../../api/src/images/ImageInformation.ts";
import {OptionalAnchor} from "./OptionalAnchor.tsx";
import {ArtworkUploader} from "./uploader-modal/ArtworkUploader.tsx";
import {useIsDevelopment} from "../../../hooks/useIsDevelopment.ts";
import _ from "lodash";
import {useIsMobile} from "../../../hooks/useIsMobile.ts";

export function Artwork() {
    const {images, altData, imageEntries} = useTagHooks()
    const imageId = encodeURIComponent(useParams().id ?? "");
    const displayedImage = imageEntries.find(value => value.id === imageId);
    const parentImage: ImageInformation | undefined = displayedImage && isAltInformation(displayedImage) ? images.find(value => displayedImage.parent === value.title) : displayedImage as ImageInformation
    const [searchParams] = useSearchParams()
    const isDevelopment = useIsDevelopment();
    const isMobile = useIsMobile();

    return <Container className={"fade"} style={{height: `calc(100vh - ${isMobile ? '72px' : '2rem'})`, display: "flex", flexDirection: "column"}}>
        <h3 className={"secondary-text bottom-margin middle-align"}>
            <Link to={{pathname: '/gallery', search: searchParams.toString()}}>
                <button className="transparent circle"><i>arrow_back</i></button>
            </Link>
            {parentImage?.title}
        </h3>
        <OptionalAnchor target="_blank" rel="noopener noreferrer" style={{display: "contents"}} href={displayedImage.href}>
            <img style={{width: "100%", height: "100%", flex: 1, objectFit: "contain"}} src={displayedImage?.webp}/>
        </OptionalAnchor>
        <h4 className={"bottom-margin tertiary-text"}>Tags</h4>
        <div>
            {displayedImage?.tags.sort((a, b) => a.localeCompare(b)).map((value, index) => <button className={clsx("primary-container chip")} style={{marginLeft: index === 0 ? 0 : "inherit"}}>{value}</button>)}
            <button className={clsx("secondary-container chip")} style={{marginLeft: "inherit"}}>{_.capitalize(displayedImage.rating)}</button>
            {displayedImage?.characters.map((value, index) => <button className={clsx("chip tertiary-container tertiary-border")} style={{marginLeft: index === 0 ? 0 : "inherit"}}>{value}</button>)}
        </div>
        {parentImage?.title && altData.get(parentImage?.title) && <div className={"top-margin"}>
            <b className={"tertiary-text"}>Alts</b>
            <div style={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridGap: '1rem', overflowX: "scroll"}}>
                <Link to={`/gallery/${parentImage.id}`}><img src={parentImage.thumbnailUrl} style={{width: "100%"}}/></Link>
                {altData.get(parentImage?.title)?.map(value => <Link to={`/gallery/${value.id}`}><img src={value.thumbnailUrl} style={{width: "100%"}}/></Link>)}
            </div>
        </div>}
        <b className={"top-margin"}>Published {parentImage.published}</b>
        {isDevelopment && <ArtworkUploader variant={"alt"} parent={parentImage}/>}
    </Container>;
}