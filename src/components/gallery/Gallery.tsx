import React, {memo, useEffect, useState} from "react";
import {Autocomplete, FormControlLabel, Grid, Pagination, Radio, RadioGroup, Stack, TextField, Typography, useMediaQuery,} from "@mui/material";
import {ImageInformation, isImageInformation} from "../ImageInformation";
import "./gallery.css";
import {theme} from "../../App";
import {useTagHooks} from "./UseTagHooks";
import Uploader from "./Uploader";
import useMeasure from 'react-use-measure';
import {ResizeObserver} from '@juggle/resize-observer'
import MonthSeparatedGallery from "./ChronologicalGallery";
import {AutocompleteFilterChip, FilterPane} from "./FilterPane";
import {RouteWithSubpanel} from "../common/RouteWithSubpanel";
import {SkeletonImage} from "../SkeletonImage";
import {TSJustifiedLayout} from "react-justified-layout-ts";
import {createSearchParams, Link, useNavigate} from "react-router-dom";
import {useQueryState} from "react-router-use-location-state";
import {prepareFileName} from "./Utils";
import {Bookmark, BookmarkAdd, BookmarkRemove, Cancel, Share} from "@mui/icons-material";
import {ArtTag, SelectedFilters} from "./TagUtils";
import {croppedImageWithCurvedBorder} from "../lore/characters/TemplatedLorePage";
import {Button} from "@mui/material-next";
import axios from "axios";
import {useIsDevelopment} from "./UseIsDevelopment";

export function getMonthYearPairsInImageSet(images: ImageInformation[]): Set<string> {
    return new Set(images.filter(value => value.published !== undefined).map(value => value.published.substring(0, 7)));
}

export function imageSort(a: ImageInformation, b: ImageInformation) {
    return b.published.localeCompare(a.published);
}

export function getShownImages(images: ImageInformation[], selectedFilters: SelectedFilters, filterMode: "and" | "or") {
    return images.filter(value => selectedFilters.doesImageMatch(value, filterMode)).sort(imageSort);
}

function updateTags(tags: ArtTag[], selectedImages: string[], add = true) {
    axios.post("http://localhost:9000/tag", {images: selectedImages, tags: tags, add: add})
        .then((value) => console.log("Finished updating tags on the following artworks: ", value))
        .catch((reason) => console.log(reason))
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
    const [batchTagging, setBatchTagging] = useState<ArtTag[]>([])
    const [batchTagEnabled, setBatchTagEnabled] = useState(false)
    const [selectedImages, setSelectedImages] = useState<string[]>([])

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
            pathname: prepareFileName(value.title)
        })
    }

    const height = 400;
    const tolerance = .2;
    const {isDevelopment} = useIsDevelopment();
    const content = <>
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
                                           tolerance={tolerance}
                                           altInfo={altData}/> :
                    <TSJustifiedLayout width={bounds.width}
                                       targetRowHeight={height}
                                       targetRowHeightTolerance={tolerance}
                                       rowSpacing={8}
                                       itemSpacing={8}
                                       containerStyle={{position: "relative"}}
                                       layoutItems={imagesOnPage.map(value => (
                                           value.aspectRatio ?? 1
                                       ))}>
                        {imagesOnPage.map(value => {
                            const {src, aspectRatio, thumbnailUrl, title} = value;
                            const content = <SkeletonImage
                                hasAlts={altData.has(title)}
                                alt={title}
                                src={thumbnailUrl ?? src}
                                imageClassname={"artImage"}
                                style={croppedImageWithCurvedBorder}
                                aspectRatio={aspectRatio ?? 1}/>;
                            if (batchTagEnabled) {
                                return <div onClick={() => setSelectedImages(prevState => prevState.includes(title) ? prevState.filter(value => value !== title) : [...prevState, title])}
                                            style={{
                                                backgroundColor: selectedImages.includes(title) ? "var(--md-sys-color-primaryContainer)" : 'initial',
                                                borderRadius: 8,
                                                overflow: "hidden",
                                                padding: selectedImages.includes(title) ? 16 : 0,
                                                transition: "padding .2s ease",
                                                aspectRatio: aspectRatio ?? 1
                                            }}>
                                    {content}
                                </div>
                            } else {
                                return <Link to={prepareFileName(title)}>{content}</Link>;
                            }
                        })}
                    </TSJustifiedLayout>
                }
            </div>
        </Stack>
        <Stack style={{alignItems: 'end', position: 'fixed', bottom: 16, right: 16}} className={'appear-after-animation-end'} spacing={2}>
            <Button onClick={() => navigation({
                pathname: "/reference",
                search: createSearchParams({'reference-name': referenceName, 'filter-mode': filterMode, filters: filters.toString()}).toString()
            })}
                    color="primary"
                    variant={"filledTonal"}
                    aria-label="share"
                    size={"small"}>
                <Share/>
            </Button>
            <Uploader loadImageInfo={loadImageInfo}/>
            {/*TODO Extract this into it's own component*/}
            {isDevelopment && (batchTagEnabled ? <div style={{display: 'flex', gap: 8, width: '100%'}}>
                <Autocomplete multiple
                              style={{flex: 1}}
                              renderInput={(params) => <TextField
                                      {...params}
                                      variant="filled"
                                      label="Tags"
                                      size={"small"}
                              />}
                              value={batchTagging}
                              onChange={(_event, value) => setBatchTagging(value as ArtTag[])}
                              size={"medium"}
                              renderTags={(value, getTagProps) => value.map((option, index) => <AutocompleteFilterChip option={option} tagProps={getTagProps({index})}/>)}
                              options={Object.values(ArtTag)}/>
                <Button variant={"filled"} color={"primary"} onClick={() => updateTags(batchTagging, selectedImages)}><BookmarkAdd/></Button>
                <Button variant={"filled"} color={"primary"} onClick={() => updateTags(batchTagging, selectedImages, false)}><BookmarkRemove/></Button>
                <Button variant={"filled"} color={"secondary"} onClick={() => setBatchTagEnabled(false)}><Cancel/></Button>
            </div> : <Button startIcon={<Bookmark/>} variant={"filled"} color={"primary"} onClick={() => setBatchTagEnabled(true)}>Batch Tag</Button>)}
        </Stack>
    </>;
    return <RouteWithSubpanel panel={<FilterPane filterMode={filterMode} setFilterMode={setFilterMode} filters={filters} setFilters={handleTagChange}/>} routeContent={content}/>;
});

