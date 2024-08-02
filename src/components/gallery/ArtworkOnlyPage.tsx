import {flattenTags, TagState, useTagHooks} from "./UseTagHooks";
import {createSearchParams, useNavigate} from "react-router-dom";
import {Container, Fade, Typography} from "@mui/material";
import {ImageInformation} from "../ImageInformation";
import {useQueryState} from "react-router-use-location-state";
import useMeasure from "react-use-measure";
import {ResizeObserver} from "@juggle/resize-observer";
import {prepareFileName} from "./Utils";
import {TSJustifiedLayout} from "react-justified-layout-ts";
import {SkeletonImage} from "../SkeletonImage";
import React from "react";
import {getShownImages} from "./Gallery";
import {drawerColor} from "../navigation/NavigationRail";

// Page that only displays artworks in a grid, and hides all other elements
export function ArtworkOnlyPage() {
    const {getTags, images, loadImageInfo, altData} = useTagHooks();

    const [filterMode] = useQueryState<"and" | "or">("filter-mode", "and");
    const [ref, bounds] = useMeasure({polyfill: ResizeObserver});
    const [referenceName] = useQueryState("reference-name", "Character Reference");

    const navigation = useNavigate();

    let tags: TagState = getTags();

    const enabledTags: string[] = Object.entries(flattenTags(tags)).filter(
        ([, value]) => value === 1
    ).map(([tagName]) => tagName);
    const hiddenTags: string[] = Object.entries(flattenTags(tags)).filter(
        ([, value]) => value === -1
    ).map(([tagName]) => tagName);

    function handleImageClicked(value: ImageInformation) {
        navigation({
            pathname: "/artwork",
            search: createSearchParams({
                title: prepareFileName(value.title)
            }).toString()
        })
    }

    let shownImages = getShownImages(images, filterMode, enabledTags, hiddenTags);

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
                        {shownImages.map(value => <SkeletonImage
                            onClick={() => handleImageClicked(value)}
                            hasAlts={altData.has(value.title)}
                            alt={value.title}
                            src={value.thumbnailUrl ?? value.src}
                            imageClassname={"artImage"}
                            aspectRatio={value.aspectRatio ?? 1}/>)}
                    </TSJustifiedLayout>
                </div>
            </div>
        </Container>
    </Fade>;

}