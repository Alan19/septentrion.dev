import images from "../../content/gallery/images.json"
import type {JSX} from "react";

export function ArtworkComponent(props: Readonly<{ children: JSX.Element }>) {
    let urlSearchParams = new URLSearchParams(window.location.search);
    const artwork = images.find(image => image.id === urlSearchParams.get('id'))
    return <div className="container">
        <div>
            {artwork && <>
                <h2>{artwork.title}</h2>
                <img src={artwork.webp} style={{width: "100%", height: "100%", viewTransitionName: `img-${artwork.id}`}} />
            </>}
        </div>
    </div>
}