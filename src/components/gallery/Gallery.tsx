import React, {memo, useEffect, useState} from "react";
import {Fab, Fade, FormControlLabel, Grid, Pagination, Radio, RadioGroup, Stack, Typography, useMediaQuery,} from "@mui/material";
import {ImageInformation, isImageInformation} from "../ImageInformation";
import "./gallery.css";
import {theme} from "../../App";
import {useTagHooks} from "./UseTagHooks";
import Uploader from "./Uploader";
import useMeasure from 'react-use-measure';
import {ResizeObserver} from '@juggle/resize-observer'
import MonthSeparatedGallery from "./ChronologicalGallery";
import {FilterPane} from "./FilterPane";
import {RouteWithSubpanel} from "../navigation/RouteWithSubpanel";
import {SkeletonImage} from "../SkeletonImage";
import {TSJustifiedLayout} from "react-justified-layout-ts";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useQueryState} from "react-router-use-location-state";
import {prepareFileName} from "./Utils";
import {Share} from "@mui/icons-material";
import {SelectedFilters} from "./TagUtils";

export function getMonthYearPairsInImageSet(images: ImageInformation[]): Set<string> {
    // @ts-ignore
    return new Set(images.filter(value => value.published !== undefined).map(value => value.published.substring(0, 7)));
}

export function imageSort(a: ImageInformation, b: ImageInformation) {
    return b.published.localeCompare(a.published);
}

export function getShownImages(images: ImageInformation[], selectedFilters: SelectedFilters, filterMode: "and" | "or") {
    return images.filter(value => selectedFilters.doesImageMatch(value, filterMode)).sort(imageSort);
}

export const Gallery = memo(function Gallery() {
    type GalleryDisplayModes = 'monthly' | 'all' | 'paginated';

    const {filters, setFilters, images, loadImageInfo, altData} = useTagHooks();
    const [ref, bounds] = useMeasure({polyfill: ResizeObserver});
    const [displayMode, setDisplayMode] = useQueryState<GalleryDisplayModes>('display-mode', "paginated");
    const [pageSize, setPageSize] = useState<number>(12);
    const [page, setPage] = useQueryState<number>('page', 1);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [filterMode, setFilterMode] = useQueryState<"and" | "or">("filter-mode", "and");

    // TODO Add method to export name, and also copy URL to clipboard
    const [referenceName, setReferenceName] = useState("")

    const navigation = useNavigate();

    const isMediumOrAbove = useMediaQuery(theme.breakpoints.up("md"));


    function handleTagChange(tags: string) {
        setFilters(tags);
        setPage(1);
    }

    let shownImages = getShownImages(images, filters, filterMode);
    useEffect(() => {
        if (isMediumOrAbove) {
            setIsDrawerOpen(false);
        }
    }, [isMediumOrAbove]);

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setReferenceName(event.target.value);
    }

    function handlePageChange(_event: React.ChangeEvent<unknown>, value: number) {
        setPage(value);
    }

    const mainImages: ImageInformation[] = shownImages.filter(isImageInformation);
    const imagesOnPage = !(displayMode === "all") ? mainImages.slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize) : mainImages;

    function handleImageClicked(value: ImageInformation) {
        navigation({
            pathname: "/artwork",
            search: createSearchParams({
                title: prepareFileName(value.title)
            }).toString()
        })
    }

    const height = 350;
    const content = <Fade in>
        <div>
            <Typography variant={"h3"} color={"var(--md-sys-color-primary)"} fontFamily={"Origin Tech"}>Alcor's Gallery</Typography>
            <div ref={ref}></div>
            <Stack direction={"column"} spacing={2}>
                <div style={{display: "flex", flexDirection: "column", overflow: "hidden"}}>
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
                        <MonthSeparatedGallery displayedImages={shownImages}
                                               width={bounds.width}
                                               height={height}
                                               setCurrentImage={handleImageClicked}
                                               altInfo={altData}/> :
                        <TSJustifiedLayout width={bounds.width}
                                           targetRowHeight={height}
                                           rowSpacing={8}
                                           itemSpacing={8}
                                           containerStyle={{position: "relative"}}
                                           layoutItems={imagesOnPage.map(value => (
                                               value.aspectRatio ?? 1
                                           ))}>
                            {imagesOnPage.map(value => <SkeletonImage
                                onClick={() => handleImageClicked(value)}
                                hasAlts={altData.has(value.title)}
                                alt={value.title}
                                src={value.thumbnailUrl ?? value.src}
                                imageClassname={"artImage"}
                                aspectRatio={value.aspectRatio ?? 1}/>)}
                        </TSJustifiedLayout>
                    }
                </div>
            </Stack>
            <Stack style={{position: 'fixed', bottom: 16, right: 16, alignItems: 'end'}} spacing={2}>
                <Fab onClick={() => navigation({
                    pathname: "/reference",
                    search: createSearchParams({'reference-name': referenceName, 'filter-mode': filterMode, filters: filters.toString()}).toString()
                })}
                     color="primary"
                     aria-label="share"
                     size={"small"}>
                    <Share/>
                </Fab>
                <Uploader loadImageInfo={loadImageInfo}/>
            </Stack>
        </div>
    </Fade>;
    return <RouteWithSubpanel panel={<FilterPane filterMode={filterMode} setFilterMode={setFilterMode} filters={filters} setFilters={handleTagChange}/>} routeContent={content}/>;
});

