import {useTagHooks} from "../../../hooks/useTagHooks.ts";
import {useParams} from "react-router";
import {Container} from "../../ui/Container.tsx";
import {clsx} from "clsx";
import {Link, useSearchParams} from "react-router-dom";
import {type ImageInformation, isAltInformation} from "../../../../api/src/images/ImageInformation.ts";

export function Artwork() {
    const {images, altData, imageEntries} = useTagHooks()
    const imageId = encodeURIComponent(useParams().id ?? "");
    const displayedImage = imageEntries.find(value => value.id === imageId);
    const parentImage: ImageInformation | undefined = displayedImage && isAltInformation(displayedImage) ? images.find(value => displayedImage.parent === value.title) : displayedImage as ImageInformation
    const [searchParams] = useSearchParams()
    return <>
        <Container className={"fade"} style={{height: "calc(100vh - 2rem)", display: "flex", flexDirection: "column"}}>
            <h3 className={"secondary-text bottom-margin middle-align"}>
                <Link to={{pathname: '/gallery', search: searchParams.toString()}}>
                    <button className="transparent circle"><i>arrow_back</i></button>
                </Link>
                {parentImage?.title}
            </h3>
            <a href={displayedImage?.href} style={{display: "contents", pointerEvents: !displayedImage.href ? "none" : "initial"}}>
                <img style={{width: "100%", height: "100%", flex: 1, objectFit: "contain"}} src={displayedImage?.webp}/>
            </a>
            <h4 className={"bottom-margin tertiary-text"}>Tags</h4>
            <div>
                {displayedImage?.tags.sort((a, b) => a.localeCompare(b)).map((value, index) => <button className={clsx("chip fill round")} style={{marginLeft: index === 0 ? 0 : "inherit"}}>{value}</button>)}
                {displayedImage?.characters.map((value, index) => <button className={clsx("chip fill round")} style={{marginLeft: index === 0 ? 0 : "inherit", background: "var(--primary-container)"}}>{value}</button>)}
            </div>
            {parentImage?.title && altData.get(parentImage?.title) && <div className={"top-margin"}>
                <b className={"tertiary-text"}>Alts</b>
                <div style={{display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gridGap: '1rem'}}>
                    <Link to={`/gallery/${parentImage.id}`}><img src={parentImage.thumbnailUrl} style={{width: "100%"}}/></Link>
                    {altData.get(parentImage?.title)?.map(value => <Link to={`/gallery/${value.id}`}><img src={value.thumbnailUrl} style={{width: "100%"}}/></Link>)}
                </div>
            </div>}
        </Container>
    </>;
}