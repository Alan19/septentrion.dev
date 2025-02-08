import React, {memo, useEffect, useState} from "react";
import {Autocomplete, FormControlLabel, Grid, Pagination, Radio, RadioGroup, Stack, TextField, Typography, useMediaQuery,} from "@mui/material";
import {AltInformation, getAltAndPageNumber, getParentImage, ImageEntry, ImageInformation, isAltInformation, isAltTypeComplex, isImageInformation} from "../ImageInformation";
import "./gallery.css";
import {theme} from "../../App";
import {useTagHooks} from "./UseTagHooks";
import Uploader from "./Uploader";
import useMeasure from 'react-use-measure';
import {ResizeObserver} from '@juggle/resize-observer'
import {AutocompleteFilterChip, FilterPane} from "./FilterPane";
import {RouteWithSubpanel} from "../common/RouteWithSubpanel";
import {SkeletonImage} from "../SkeletonImage";
import {TSJustifiedLayout} from "react-justified-layout-ts";
import {createSearchParams, Link, useNavigate, useSearchParams} from "react-router-dom";
import {useQueryState} from "react-router-use-location-state";
import {prepareFileName} from "./Utils";
import {Bookmark, BookmarkAdd, BookmarkRemove, Cancel, Share} from "@mui/icons-material";
import {ArtTag, SelectedFilters} from "./TagUtils";
import {croppedImageWithCurvedBorder} from "../lore/characters/TemplatedLorePage";
import {Button} from "@mui/material-next";
import axios from "axios";
import {useIsDevelopment} from "./UseIsDevelopment";
import ChronologicalGallery from "./ChronologicalGallery";
import {AltSettings, useAltDisplaySettings} from "./useAltDisplaySettings";

export function getMonthYearPairsInImageSet(images: ImageInformation[]): Set<string> {
    return new Set(images.filter(value => value.published !== undefined).map(value => value.published.substring(0, 7)));
}

export function imageSort(a: ImageEntry, b: ImageEntry, mainImages: ImageInformation[]): number {
    let aPublished = isImageInformation(a) ? a.published : mainImages.find(value => value.title === a.parent)?.published as string;
    let bPublished = isImageInformation(b) ? b.published : mainImages.find(value => value.title === b.parent)?.published as string;
    const aTitle = isImageInformation(a) ? a.title : a.parent;
    const bTitle = isImageInformation(b) ? b.title : b.parent;
    const dateComparison = bPublished.localeCompare(aPublished);
    const titleComparison = bTitle.localeCompare(aTitle);
    const altVsParentComparison = (isAltInformation(b) ? 1 : 0) - (isAltInformation(a) ? 1 : 0);
    const complexAltTypeComparison = (isAltTypeComplex((b as AltInformation).altType) ? 1 : 0) - (isAltTypeComplex((a as AltInformation).altType) ? 1 : 0)
    const sequenceNumberComparison = (getAltAndPageNumber(b as AltInformation).pageNumber ?? 0) - (getAltAndPageNumber(a as AltInformation).pageNumber ?? 0);
    const altNumberComparion = (getAltAndPageNumber(b as AltInformation).altNumber ?? 0) - (getAltAndPageNumber(a as AltInformation).altNumber ?? 0);

    return dateComparison || titleComparison || altVsParentComparison || complexAltTypeComparison || sequenceNumberComparison || altNumberComparion;
}

export function getShownImages(images: ImageEntry[], selectedFilters: SelectedFilters, filterMode: "and" | "or", altDisplaySettings: AltSettings) {
    return images.filter(value => {
        if (isImageInformation(value)) {
            return selectedFilters.doesImageMatch(value, filterMode);
        } else {
            if ((getParentImage(value.id, images) as ImageInformation) === undefined) {
                console.log(value)
            }
            return selectedFilters.doesImageMatch({...value, artist: (getParentImage(value.id, images) as ImageInformation).artist}, filterMode) && filterAlts(value, altDisplaySettings);
        }
    });
}

function filterAlts(altInformation: AltInformation, altFilters: AltSettings) {
    const {altType} = altInformation;
    const {displayAlts: alts, displayExtras: extras, displaySequences: sequences, displayCrops: crops, displayRecolors: recolors} = altFilters;
    const cropsMatch = (altType === 'cropped') && crops;
    const recolorsMatch = (altType === 'recolor') && recolors;
    const extrasMatch = (altType === "extra") && extras;
    const sequenceMatch = isAltTypeComplex(altType) && ((altType.pageNumber ?? 0) > 0) && !altType.altNumber && sequences;
    const altMatch = isAltTypeComplex(altType) && ((altType.altNumber ?? 0) > 0) && !altType.pageNumber && alts;
    const altAndSequenceMatch = alts && sequences && isAltTypeComplex(altType);

    return extrasMatch || recolorsMatch || cropsMatch || sequenceMatch || altMatch || altAndSequenceMatch;
}


function updateTags(tags: ArtTag[], selectedImages: string[], add = true) {
    axios.post("http://localhost:9000/tag", {images: selectedImages, tags: tags, add: add})
        .then((value) => console.log("Finished updating tags on the following artworks: ", value))
        .catch((reason) => console.log(reason))
}

export const Gallery = memo(function Gallery() {
    type GalleryDisplayModes = 'monthly' | 'all' | 'paginated';

    const {filters, setFilters, images, loadImageInfo, altData, imageEntries} = useTagHooks();
    const [ref, bounds] = useMeasure({polyfill: ResizeObserver});
    const [displayMode, setDisplayMode] = useQueryState<GalleryDisplayModes>('display-mode', "paginated");
    const [pageSize, setPageSize] = useState<number>(12);
    const [page, setPage] = useQueryState<number>('page', 1);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [filterMode, setFilterMode] = useQueryState<"and" | "or">("filter-mode", "and");
    const [batchTagging, setBatchTagging] = useState<ArtTag[]>([])
    const [batchTagEnabled, setBatchTagEnabled] = useState(false)
    const [selectedImages, setSelectedImages] = useState<string[]>([])
    const altDisplaySettings = useAltDisplaySettings();
    const [searchParams] = useSearchParams();

    // TODO Add method to export name, and also copy URL to clipboard
    const [referenceName, setReferenceName] = useState("")
    const navigation = useNavigate();
    const isMediumOrAbove = useMediaQuery(theme.breakpoints.up("md"));

    function handleTagChange(tags: string) {
        setFilters(tags);
        setPage(1);
    }

    let shownImages: ImageEntry[] = getShownImages(imageEntries, filters, filterMode, altDisplaySettings).sort((a, b) => imageSort(a, b, images))


    useEffect(() => {
        if (isMediumOrAbove) {
            setIsDrawerOpen(false);
        }
    }, [isMediumOrAbove]);

    function handlePageChange(_event: React.ChangeEvent<unknown>, value: number) {
        setPage(value);
    }

    const imagesOnPage = (!(displayMode === "all") ? shownImages.slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize) : shownImages);

    function handleImageClicked(value: ImageInformation) {
        navigation({
            pathname: prepareFileName(value.title),
        })
    }

    const height = 320;
    const tolerance = .2;
    const {isDevelopment} = useIsDevelopment();

    const content = <>
        <Typography variant={"h3"} fontFamily={"Potra"} color={"var(--md-sys-color-primary)"}>Alcor's Gallery</Typography>
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


                {
                    displayMode === "monthly" ?
                        <ChronologicalGallery displayedImages={shownImages.map(value => isAltInformation(value) ? {...value, published: (getParentImage(value.id, imageEntries) as ImageInformation).published} : value)}
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
                                const {src, aspectRatio, thumbnailUrl, id} = value;
                                const title = isImageInformation(value) ? value.title : value.parent;
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
                                    return <Link to={{pathname: id, search: searchParams.toString()}}>{content}</Link>;
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
    return <RouteWithSubpanel panel={<FilterPane filterMode={filterMode} setFilterMode={setFilterMode} filters={filters} setFilters={handleTagChange} altDisplaySettings={altDisplaySettings}/>} routeContent={content}/>;
});

