import {useTagHooks} from "./UseTagHooks";
import {useNavigate} from "react-router-dom";
import {Container, Fade, Typography} from "@mui/material";
import {isImageInformation} from "../ImageInformation";
import {useQueryState} from "react-router-use-location-state";
import useMeasure from "react-use-measure";
import {ResizeObserver} from "@juggle/resize-observer";
import {TSJustifiedLayout} from "react-justified-layout-ts";
import React from "react";
import {getShownImages, imageSort} from "./Gallery";
import {drawerColor} from "../common/Navigation";
import {SkeletonImage} from "../SkeletonImage";
import {useAltDisplaySettings} from "./useAltDisplaySettings";

// Page that only displays artworks in a grid, and hides all other elements
export function MinimalGalleryPage() {
    const {filters, images, altData} = useTagHooks();

    const [filterMode] = useQueryState<"and" | "or">("filter-mode", "and");
    const [ref, bounds] = useMeasure({polyfill: ResizeObserver});
    const [referenceName] = useQueryState("reference-name", "Character Reference");
    const altDisplaySettings = useAltDisplaySettings();


    const navigation = useNavigate();
    let shownImages = getShownImages(images, filters, filterMode, altDisplaySettings).sort((a, b) => imageSort(a, b, images));

    const height = 350;
    return <Fade in>
        <Container maxWidth="xl" style={{display: "flex"}}>
            <div style={{
                background: drawerColor,
                borderRadius: 24,
                padding: 16,
                marginBottom: 16,
                marginTop: 16
            }}>
                <Typography variant={"h3"} color={"var(--md-sys-color-primary)"} fontFamily={"Origin Tech"}>{referenceName}</Typography>
                <div ref={ref}></div>
                <div style={{display: "flex", flexDirection: "column", overflow: "hidden"}}>
                    <TSJustifiedLayout width={bounds.width}
                                       targetRowHeight={height}
                                       rowSpacing={8}
                                       itemSpacing={8}
                                       containerStyle={{position: "relative"}}
                                       layoutItems={shownImages.map(value => (
                                           value.aspectRatio ?? 1
                                       ))}>
                        {shownImages.map(value => {
                            const title = isImageInformation(value) ? value.title : value.parent;
                            return <SkeletonImage
                                onClick={() => navigation(`/gallery/${value.id}`)}
                                hasAlts={altData.has(title)}
                                alt={title}
                                src={value.thumbnailUrl ?? value.src}
                                imageClassname={"artImage"}
                                aspectRatio={value.aspectRatio ?? 1}/>;
                        })}
                    </TSJustifiedLayout>
                </div>
            </div>
        </Container>
    </Fade>;

}