import React, {memo, useEffect, useState} from "react";
import {Autocomplete, Container, FormControlLabel, Grid, Pagination, Radio, RadioGroup, Stack, TextField, Typography, useMediaQuery,} from "@mui/material";
import {getParentImage, ImageEntry, ImageInformation, isAltInformation, isImageInformation} from "../../../api/src/images/ImageInformation.ts";
import "./gallery.css";
import {useTagHooks} from "./UseTagHooks";
import Uploader from "./Uploader";
import useMeasure from 'react-use-measure';
import {ResizeObserver} from '@juggle/resize-observer'
import {FilterPane} from "./FilterPane";
import {RouteWithSubpanel} from "../common/RouteWithSubpanel";
import {SkeletonImage} from "../SkeletonImage";
import {TSJustifiedLayout} from "react-justified-layout-ts";
import {createSearchParams, Link, useNavigate, useSearchParams} from "react-router-dom";
import {prepareFileName} from "./Utils";
import {Bookmark, BookmarkAdd, BookmarkRemove, Cancel, Share} from "@mui/icons-material";
import {ArtTag} from "../../../api/src/images/TagUtils.ts";
import {Button} from "@mui/material-next";
import {useIsDevelopment} from "./UseIsDevelopment";
import ChronologicalGallery from "./filters/ChronologicalGallery.tsx";
import {useAltDisplaySettings} from "./useAltDisplaySettings";
import {materialDesign2Theme} from "../../MaterialDesign2Theme.tsx";
import {croppedImageWithCurvedBorder} from "../common/BorderStyling.ts";
import {useDocumentTitle} from "usehooks-ts";
import {useQueryState} from "../../UseQueryState.tsx";
import {FilterMode, getShownImages, imageSort, updateTags} from "./GalleryUtils.ts";
import {AutocompleteFilterChip} from "./filters/AutocompleteFilterChip.tsx";

export const Gallery = memo(function Gallery() {
    enum GalleryDisplayModes {monthly = 'monthly', all = 'all', paginated = 'paginated'}

    const {filters, images, loadImageInfo, altData, imageEntries} = useTagHooks();
    const [ref, bounds] = useMeasure({polyfill: ResizeObserver});
    const [displayMode, setDisplayMode] = useQueryState<GalleryDisplayModes>('display-mode', GalleryDisplayModes.paginated);
    const [pageSize, setPageSize] = useState<number>(12);
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

    const imagesOnPage = displayMode !== "all" ? shownImages.slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize) : shownImages;

    function handleImageClicked(value: ImageInformation) {
        navigation({
            pathname: prepareFileName(value.title),
        })
    }

    const height = 320;
    const tolerance = .2;
    const {isDevelopment} = useIsDevelopment();

    useDocumentTitle("Gallery");


    const content = <Container>
        <Typography variant={"h3"} fontFamily={"Potra"} color={"var(--md-sys-color-primary)"}>Alcor's Gallery</Typography>
        <div ref={ref}></div>
        <Stack direction={"column"} spacing={2}>
            <div style={{display: "flex", flexDirection: "column", overflow: "hidden"}}>
                <Grid container justifyContent={"space-between"} alignItems={"flex-end"}>
                    <RadioGroup value={displayMode}>
                        <FormControlLabel value={"paginated"} control={<Radio onChange={(_event) => setDisplayMode(GalleryDisplayModes.paginated)}/>}
                                          label="Display images in pages"/>
                        <FormControlLabel value={"all"} control={<Radio onChange={(_event) => setDisplayMode(GalleryDisplayModes.all)}/>}
                                          label="Display all images on one page"/>
                        <FormControlLabel value={"monthly"} control={<Radio onChange={(_event) => setDisplayMode(GalleryDisplayModes.monthly)}/>}
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
                                />;
                                if (batchTagEnabled) {
                                    return <div onClick={() => setSelectedImages(prevState => prevState.includes(title) ? prevState.filter(value => value !== title) : [...prevState, title])}
                                                style={{
                                                    backgroundColor: selectedImages.includes(title) ? "var(--md-sys-color-primaryContainer)" : 'initial',
                                                    borderRadius: 8,
                                                    overflow: "hidden",
                                                    padding: selectedImages.includes(title) ? 16 : 0,
                                                    transition: "padding .2s ease",
                                                    aspectRatio: aspectRatio ?? 1
                                                }}
                                                key={title}>
                                        {content}
                                    </div>
                                } else {
                                    return <Link key={title} to={{pathname: id, search: searchParams.toString()}}>{content}</Link>;
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
                              renderTags={(value, getTagProps) => value.map((option, index) => <AutocompleteFilterChip key={option} option={option} tagProps={getTagProps({index})}/>)}
                              options={Object.values(ArtTag)}/>
                <Button variant={"filled"} color={"primary"} onClick={() => updateTags(batchTagging, selectedImages)}><BookmarkAdd/></Button>
                <Button variant={"filled"} color={"primary"} onClick={() => updateTags(batchTagging, selectedImages, false)}><BookmarkRemove/></Button>
                <Button variant={"filled"} color={"secondary"} onClick={() => setBatchTagEnabled(false)}><Cancel/></Button>
            </div> : <Button startIcon={<Bookmark/>} variant={"filled"} color={"primary"} onClick={() => setBatchTagEnabled(true)}>Batch Tag</Button>)}
        </Stack>
    </Container>;
    return <RouteWithSubpanel panel={<FilterPane filterMode={filterMode} setFilterMode={setFilterMode} filters={filters} setFilters={handleTagChange} altDisplaySettings={altDisplaySettings}/>} routeContent={content}/>;
});

