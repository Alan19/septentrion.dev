import {useTagHooks} from "../../../hooks/useTagHooks.ts";
import {useParams} from "react-router";
import {Container} from "../../ui/Container.tsx";
import {clsx} from "clsx";
import {Link, useSearchParams} from "react-router-dom";
import {getHref, type ImageInformation, isAltInformation} from "../../../../api/src/images/ImageInformation.ts";
import {OptionalAnchor} from "./OptionalAnchor.tsx";
import {ArtworkUploader} from "./uploader-modal/ArtworkUploader.tsx";
import {useIsDevelopment} from "../../../hooks/useIsDevelopment.ts";
import _ from "lodash";
import {useIsMobile} from "../../../hooks/useIsMobile.ts";
import {useEffect} from "react";

export function Artwork() {
    const {images, altData, imageEntries} = useTagHooks()
    const imageId = encodeURIComponent(useParams().id ?? "");
    const displayedImage = imageEntries.find(value => value.id === imageId);
    const parentImage: ImageInformation | undefined = displayedImage && isAltInformation(displayedImage) ? images.find(value => displayedImage.parent === value.title) : displayedImage as ImageInformation
    const [searchParams] = useSearchParams()
    const isDevelopment = useIsDevelopment();
    const isMobile = useIsMobile();

    // Scroll to top when route is loaded
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <>
        <Container className={"fade"} style={{height: `calc(100vh - ${isMobile ? '72px' : '2rem'})`, display: "flex", flexDirection: "column"}}>
            <div className={"bottom-margin"} style={{display: "flex", alignItems: "baseline"}}>
                <Link to={{pathname: '/gallery', search: searchParams.toString()}}>
                    <button className="transparent circle"><i>arrow_back</i></button>
                </Link>
                <h3 className={"secondary-text no-margin"} style={{fontFamily: "Inter Variable"}}>
                    {parentImage?.title}
                </h3>
            </div>
            <OptionalAnchor target="_blank" rel="noopener noreferrer" style={{display: "contents"}} href={displayedImage.href}>
                <img style={{width: "100%", height: "100%", flex: 1, objectFit: "contain"}} src={displayedImage?.webp}/>
            </OptionalAnchor>
            <h4 className={"bottom-margin tertiary-text"}>Tags</h4>
            <nav style={{display: "flex", gap: "8px", overflowX: "scroll"}} className={"no-margin"}>
                {displayedImage?.tags.sort((a, b) => a.localeCompare(b)).map((value) => <button className={clsx("primary-container chip no-margin")}>{value}</button>)}
                <button className={clsx("secondary-container chip no-margin")}>{_.capitalize(displayedImage.rating)}</button>
                {displayedImage?.characters.map((value) => <button className={clsx("chip tertiary-container tertiary-border no-margin")}>{value}</button>)}
                <a target={"noreferrer noopener"} href={getHref(parentImage.artist)}>
                    <button className={"no-margin chip secondary-border"}>
                        <i>palette</i>{parentImage.artist}
                    </button>
                </a>
                <button className={"no-margin chip secondary-border"}>
                    <i>event</i>{parentImage.published}
                </button>
            </nav>

        </Container>
        {parentImage?.title && altData.get(parentImage?.title) && <Container>
            <b className={"tertiary-text"}>Alts</b>
            <div style={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridGap: '1rem', overflowX: "scroll"}}>
                <Link to={`/gallery/${parentImage.id}`}><img src={parentImage.thumbnailUrl} style={{width: "100%"}}/></Link>
                {altData.get(parentImage?.title)?.map(value => <Link to={`/gallery/${value.id}`}><img src={value.thumbnailUrl} style={{width: "100%"}}/></Link>)}
            </div>
        </Container>}
        {isDevelopment && <ArtworkUploader variant={"alt"} parent={parentImage}/>}
    </>;
}