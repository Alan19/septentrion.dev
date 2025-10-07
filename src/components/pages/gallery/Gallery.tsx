import {Container} from "../../ui/Container.tsx";
import {JustifiedGrid} from "react-justified-layout-ts";
import {useTagHooks} from "../../../hooks/useTagHooks.ts";
import useMeasure from 'react-use-measure';
import {GallerySearchbar} from "./GallerySearchbar.tsx";
import {Link} from "react-router-dom";
import {ArtworkUploader} from "./uploader-modal/ArtworkUploader.tsx";

export function Gallery() {
    const {images, altData, filters} = useTagHooks();
    const [ref, bounds] = useMeasure({polyfill: ResizeObserver});

    const displayedImages = images.filter(value => filters.doesImageMatch(value, "and")).sort((a, b) => b.published.localeCompare(a.published))
    return <>
        <Container className={"fade"}>
            <div ref={ref}></div>
            <h1 className={"primary-text"}>Gallery</h1>
            <div className={"bottom-margin"}>
                <GallerySearchbar/>
            </div>
            <JustifiedGrid aspectRatioList={displayedImages.map(value => value.aspectRatio)} width={bounds.width} targetRowHeight={350}>
                {displayedImages.map(value => <Link to={value.id}>
                    <img src={value.thumbnailUrl}/>
                    {altData.get(value.title) && <button className="absolute circle secondary-container" style={{right: 8, top: 8, opacity: .75}}>
                        <i>more</i>
                    </button>}
                </Link>)}
            </JustifiedGrid>
        </Container>
        <ArtworkUploader />
    </>;
}