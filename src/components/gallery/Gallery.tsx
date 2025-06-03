import React, {useEffect, useState} from "react";
import {Container, FormControlLabel, Grid2 as Grid, Pagination, Radio, RadioGroup, Stack, Typography, useMediaQuery,} from "@mui/material";
import {ImageEntry, isImageInformation} from "../../../api/src/images/ImageInformation.ts";
import "./gallery.css";
import {useTagHooks} from "./useTagHooks.ts";
import Uploader from "./Uploader";
import useMeasure from 'react-use-measure';
import {ResizeObserver} from '@juggle/resize-observer'
import {FilterPane} from "./FilterPane";
import {RouteWithSubpanel} from "../common/RouteWithSubpanel";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {Share} from "@mui/icons-material";
import {ArtTag} from "../../../api/src/images/TagUtils.ts";
import {Button} from "@mui/material-next";
import {useIsDevelopment} from "./UseIsDevelopment";
import {useAltDisplaySettings} from "./useAltDisplaySettings";
import {materialDesign2Theme} from "../../MaterialDesign2Theme.tsx";
import {useDocumentTitle} from "usehooks-ts";
import {useQueryState} from "../../UseQueryState.tsx";
import {FilterMode, getMonthYearPairsInImageSet, getShownImages, imageSort} from "./GalleryUtils.ts";
import {GalleryDisplayModes} from "./GalleryDisplayModes.tsx";
import {GalleryGrid} from "./GalleryGrid.tsx";
import {BatchTagging} from "../BatchTagging.tsx";

export function Gallery() {
    const {filters, images, imageEntries} = useTagHooks();
    const [ref, bounds] = useMeasure({polyfill: ResizeObserver});
    const [displayMode, setDisplayMode] = useQueryState<GalleryDisplayModes>('display-mode', GalleryDisplayModes.paginated);
    const [pageSize, setPageSize] = useState<number>(4);
    const [page, setPage] = useQueryState<number>('page', 1);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [filterMode, setFilterMode] = useQueryState<FilterMode>("filter-mode", FilterMode.and);
    const [batchTagging, setBatchTagging] = useState<ArtTag[]>([])
    const [batchTagEnabled, setBatchTagEnabled] = useState(false)
    const [selectedImages, setSelectedImages] = useState<string[]>([])
    const altDisplaySettings = useAltDisplaySettings();
    const [searchParams, setSearchParams] = useSearchParams();

    // TODO Add method to export name, and also copy URL to clipboard
    const [referenceName, setReferenceName] = useState("")
    const navigation = useNavigate();
    const isMediumOrAbove = useMediaQuery(materialDesign2Theme.breakpoints.up("md"));

    /**
     * Function to manually update 2 query strings since we can't chain them or else it causes performance issues
     * @param tags The string for the tags to filter by
     */
    function handleTagChange(tags: string) {
        const newParams = new URLSearchParams(searchParams)
        if (tags == "") {
            newParams.delete("filters")
        } else {
            newParams.set("filters", JSON.stringify(tags));
        }
        newParams.delete("page");
        setSearchParams(newParams)
    }

    const shownImages: ImageEntry[] = getShownImages(imageEntries, filters, filterMode, altDisplaySettings).sort((a, b) => imageSort(a, b, images))

    useEffect(() => {
        if (isMediumOrAbove) {
            setIsDrawerOpen(false);
        }
    }, [isMediumOrAbove]);

    function handlePageChange(_event: React.ChangeEvent<unknown>, value: number) {
        setPage(value);
    }

    const {isDevelopment} = useIsDevelopment();

    useDocumentTitle("Alcor's Gallery");

    const content = <Container>
        <Typography variant={"h3"} fontFamily={"Potra"} color={"var(--md-sys-color-primary)"}>Alcor's Gallery</Typography>
        <div ref={ref}></div>
        <Stack direction={"column"} spacing={2}>
            <div style={{display: "flex", flexDirection: "column", overflow: "hidden"}}>
                <Grid container justifyContent={"space-between"} alignItems={"flex-end"}>
                    <RadioGroup value={displayMode}>
                        <FormControlLabel value={"paginated"} control={<Radio onChange={() => setDisplayMode(GalleryDisplayModes.paginated)}/>} label="Display images in pages"/>
                        <FormControlLabel value={"monthly"} control={<Radio onChange={() => setDisplayMode(GalleryDisplayModes.monthly)}/>} label="Separate images by month"/>
                        <FormControlLabel value={"all"} control={<Radio onChange={() => setDisplayMode(GalleryDisplayModes.all)}/>} label="Display all images on one page"/>
                    </RadioGroup>
                    {
                        displayMode === "paginated" && <Grid>
                            <Pagination style={{marginBottom: "8px"}}
                                        count={Math.ceil(getMonthYearPairsInImageSet(shownImages.filter(value => isImageInformation(value))).size / pageSize)}
                                        page={page}
                                        onChange={handlePageChange}
                                        showFirstButton
                                        showLastButton/>
                        </Grid>
                    }
                </Grid>
                <GalleryGrid displayMode={displayMode}
                             displayedImages={shownImages}
                             pageNumber={page}
                             pageSize={pageSize}
                             width={bounds.width}
                             selectedImages={selectedImages}
                             setSelectedImages={setSelectedImages}
                             searchParams={searchParams.toString()}
                             isTagging={batchTagEnabled}/>
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
            {isDevelopment && <>
                <Uploader/>
                <BatchTagging isTagging={batchTagEnabled} setIsTagging={setBatchTagEnabled} tags={batchTagging} setTags={setBatchTagging} selectedImages={selectedImages}/>
            </>}
        </Stack>
    </Container>;
    return <RouteWithSubpanel panel={<FilterPane filterMode={filterMode} setFilterMode={setFilterMode} filters={filters} setFilters={handleTagChange} altDisplaySettings={altDisplaySettings}/>} routeContent={content}/>;
}

