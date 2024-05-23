import React, {memo, useEffect, useState} from "react";
import {Fade, FormControlLabel, Grid, Pagination, Radio, RadioGroup, Typography, useMediaQuery,} from "@mui/material";
import {ArtTag, ImageInformation, isImageInformation} from "../ImageInformation";
import "./gallery.css";
import {theme} from "../../App";
import {useTagHooks} from "./UseTagHooks";
import Uploader from "./Uploader";
import useMeasure from 'react-use-measure';
import {ResizeObserver} from '@juggle/resize-observer'
import ChronologicalGallery from "./ChronologicalGallery";
import {TSJustifiedLayout} from "react-justified-layout-ts";
import {GalleryDialog} from "./GalleryDialog";
import {FilterPane} from "./FilterPane";
import {RouteWithSubpanel} from "../navigation/RouteWithSubpanel";
import {SkeletonImage} from "../SkeletonImage";

export type TagState = {
    [tag in ArtTag]: number;
};

export function getNewTagState(): TagState {
    return Object.values(ArtTag).reduce((previousValue, currentValue) => ({...previousValue, [currentValue]: 0}), {}) as TagState
}

export function getMonthYearPairsInImageSet(images: ImageInformation[]): Set<string> {
    // @ts-ignore
    return new Set(images.filter(value => value.published !== undefined).map(value => value.published.substring(0, 7)));
}

type GalleryDisplayModes = 'monthly' | 'all' | 'paginated';

export const Gallery = memo(function Gallery() {
    const {getTags, setTags, images, loadImageInfo, altData} = useTagHooks();
    const [currentImage, setCurrentImage] = useState<ImageInformation>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [ref, bounds] = useMeasure({polyfill: ResizeObserver});
    const [displayMode, setDisplayMode] = useState<GalleryDisplayModes>("paginated");
    const [pageSize, setPageSize] = useState<number>(12);
    const [page, setPage] = useState<number>(1);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [filterMode, setFilterMode] = useState<"and" | "or">("and");

    let tags: TagState = getTags();
    const isMediumOrAbove = useMediaQuery(theme.breakpoints.up("md"));

    const enabledTags: ArtTag[] = Object.keys(tags).filter(
        (value) => tags[value as ArtTag] === 1
    ) as ArtTag[];
    const hiddenTags: ArtTag[] = Object.keys(tags).filter(
        (value) => tags[value as ArtTag] === -1
    ) as ArtTag[];


    function handleTagChange(tags: TagState) {
        setTags(tags);
        setPage(1);
    }

    let shownImages = images
        .filter(isImageInformation)
        .filter((value) => {
            let hasFilterTag;
            switch (filterMode) {
                case "and":
                    hasFilterTag = enabledTags.every((tag) => value.tags?.includes(tag) ?? false);
                    break;
                case "or":
                    hasFilterTag = enabledTags.some((tag) => value.tags?.includes(tag) ?? false);
                    break;
            }
            const hasHiddenTag = hiddenTags.some(
                (tag) => value.tags?.includes(tag) ?? false
            );
            if (enabledTags.length === 0) {
                return !hasHiddenTag;
            } else {
                return hasFilterTag && !hasHiddenTag;
            }
        })
        .sort(imageSort);

    function imageSort(a: ImageInformation, b: ImageInformation) {
        return b.published.localeCompare(a.published);
    }


    useEffect(() => {
        if (isMediumOrAbove) {
            setIsDrawerOpen(false);
        }
    }, [isMediumOrAbove]);

    function handlePageChange(_event: React.ChangeEvent<unknown>, value: number) {
        setPage(value);
    }

    const mainImages: ImageInformation[] = shownImages.filter(isImageInformation);
    const imagesOnPage = !(displayMode === "all") ? mainImages.slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize) : mainImages;

    function closeModal() {
        setIsDialogOpen(false);
    }

    function handleImageClicked(value: ImageInformation) {
        setCurrentImage(value);
        setIsDialogOpen(true);
    }

    const content = <Fade in>
        <div>
            <Typography variant={"h3"} color={"var(--md-sys-color-primary)"} fontFamily={"Origin Tech"}>Alcor's Gallery</Typography>
            <GalleryDialog isOpen={isDialogOpen} currentImage={currentImage} closeModal={closeModal} alts={currentImage?.title !== undefined ? altData.get(currentImage.title) : undefined}/>
            <div ref={ref}></div>
            <Grid container direction={"column"} spacing={2}>
                <Grid item style={{display: "flex", flexDirection: "column", overflow: "hidden"}}>
                    <Grid container justifyContent={"space-between"} alignItems={"flex-end"}>
                        <RadioGroup value={displayMode}>
                            <FormControlLabel value={"paginated"} control={<Radio onChange={(_event) => setDisplayMode("paginated")}/>}
                                              label="Display images in pages"/>
                            <FormControlLabel value={"all"} control={<Radio onChange={(_event) => setDisplayMode("all")}/>}
                                              label="Display all images on one page"/>
                            <FormControlLabel value={"monthly"} control={<Radio onChange={(_event) => setDisplayMode("monthly")}/>}
                                              label="Separate images by month"/>
                        </RadioGroup>
                        {
                            displayMode === "paginated" && <Grid item>
                                <Pagination style={{marginBottom: "8px"}}
                                            count={Math.ceil(shownImages.length / pageSize)}
                                            page={page}
                                            onChange={handlePageChange}
                                            showFirstButton
                                            showLastButton/>
                            </Grid>
                        }
                    </Grid>


                    {displayMode === "monthly" ?
                        <ChronologicalGallery displayedImages={shownImages}
                                              width={bounds.width}
                                              setCurrentImage={handleImageClicked}
                                              altInfo={altData}/> :
                        <TSJustifiedLayout width={bounds.width}
                                           targetRowHeight={350}
                                           rowSpacing={8}
                                           itemSpacing={8}
                                           layoutItems={imagesOnPage.map(value => (
                                               value.aspectRatio ?? 1
                                           ))}>
                            {imagesOnPage.map(value => <SkeletonImage
                                onClick={() => handleImageClicked(value)}
                                hasAlts={altData.has(value.title)}
                                alt={value.title}
                                containerStyle={{position: "relative", height: "100%"}}
                                src={value.thumbnailUrl ?? value.src}
                                imageClassname={"artImage"}
                                aspectRatio={value.aspectRatio ?? 1}/>)}
                        </TSJustifiedLayout>
                    }
                </Grid>
            </Grid>
            <Uploader loadImageInfo={loadImageInfo}/>
        </div>
    </Fade>;
    return <RouteWithSubpanel panel={<FilterPane filterMode={filterMode} setFilterMode={setFilterMode} tagState={tags} setTag={handleTagChange}/>} routeContent={content}/>;
});

