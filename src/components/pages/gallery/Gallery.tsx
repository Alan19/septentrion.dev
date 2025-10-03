import {Container} from "../../ui/Container.tsx";
import {JustifiedGrid} from "react-justified-layout-ts";
import {useTagHooks} from "../../../hooks/useTagHooks.ts";
import {GallerySearchbar} from "./GallerySearchbar.tsx";
import {Link} from "react-router-dom";

export function Gallery() {
    const {images, altData} = useTagHooks();
    images.sort((a, b) => b.published.localeCompare(a.published))
    return <Container className={"fade"}>
        <h1 className={"primary-text"}>Gallery</h1>
        <GallerySearchbar/>
        <JustifiedGrid aspectRatioList={images.map(value => value.aspectRatio)} width={1100}>
            {images.map(value => <Link to={value.id}>
                <img src={value.thumbnailUrl}/>
                {altData.get(value.title) && <button className="absolute circle secondary-container" style={{right: 8, top: 8, opacity: .75}}>
                    <i>more</i>
                </button>}
            </Link>)}
        </JustifiedGrid>
    </Container>;
}