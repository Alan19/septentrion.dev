import React, {useEffect, useState} from "react";
import Chip from '@mui/material-next/Chip';
import {Fade, FormControlLabel, Grid, Pagination, Radio, RadioGroup, Typography, useMediaQuery,} from "@mui/material";
import {ArtTag, ImageInformation, isImageInformation} from "../ImageInformation";
import {Remove,} from "@mui/icons-material";
import "./gallery.css";
import {theme} from "../../App";
import {useTagHooks} from "./UseTagHooks";
import Uploader from "./Uploader";
import useMeasure from 'react-use-measure';
import {ResizeObserver} from '@juggle/resize-observer'
import ChronologicalGallery from "./ChronologicalGallery";
import {TSJustifiedLayout} from "react-justified-layout-ts";
import {GalleryDialog} from "./GalleryDialog";
import {ChipPropsColorOverrides} from "@mui/material-next/Chip/Chip.types";
import {OverridableStringUnion} from "@mui/types";
import {FilterPane} from "./FilterPane";
import {RouteWithSubpanel} from "../navigation/RouteWithSubpanel";
import {SkeletonImage} from "../SkeletonImage";

export type TagState = {
    [tag in ArtTag]: number;
};

export function getMonthYearPairsInImageSet(images: ImageInformation[]): Set<string> {
    // @ts-ignore
    return new Set(images.filter(value => value.published !== undefined).map(value => value.published.substring(0, 7)));
}

type GalleryDisplayModes = 'monthly' | 'all' | 'paginated';

export function Gallery() {
    const {getTags, setTags, images, loadImageInfo, altData} = useTagHooks();
    const [currentImage, setCurrentImage] = useState<ImageInformation>();
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [ref, bounds] = useMeasure({polyfill: ResizeObserver})
    const [displayMode, setDisplayMode] = useState<GalleryDisplayModes>('paginated');
    const [pageSize, setPageSize] = useState<number>(12);
    const [page, setPage] = useState<number>(1);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

    function toggleHide(tagName: ArtTag) {
        if (tags[tagName] !== 1) {
            handleTagChange({...tags, [tagName]: 1});
        } else {
            handleTagChange({...tags, [tagName]: 0});
        }
    }

    function filterTag(tagName: ArtTag) {
        if (tags[tagName] !== -1) {
            handleTagChange({...tags, [tagName]: -1});
        } else {
            handleTagChange({...tags, [tagName]: 0});
        }
    }

    function filterCategories(
        element: React.JSX.Element,
        categoryName: string,
        filterFunction: (value: ArtTag) => boolean
    ) {
        function getColor(tag: ArtTag): OverridableStringUnion<'primary' | 'secondary' | 'tertiary' | 'error' | 'info' | 'success' | 'warning', ChipPropsColorOverrides> {
            switch (tags[tag]) {
                case 1:
                    return "primary";
                case -1:
                    return "error";
                default:
                    return "primary";
            }
        }

        return (
            <>
                <Typography variant={"h6"} style={{marginTop: "8px"}}>
                    {element} {categoryName}
                </Typography>
                <Grid container direction={"row"} spacing={1}>
                    {Object.values(ArtTag)
                        .filter(filterFunction)
                        .map((tag) => (
                            <Grid item>
                                <Chip
                                    label={tag}
                                    onClick={() => toggleHide(tag)}
                                    variant={tags[tag] ? "filled" : "outlined"}
                                    deleteIcon={<Remove/>}
                                    onDelete={() => filterTag(tag)}
                                    color={getColor(tag)}
                                />
                            </Grid>
                        ))}
                </Grid>
            </>
        );
    }

    let shownImages = images
        .filter(isImageInformation)
        .filter((value) => {
            const hasFilterTag = enabledTags.some(
                (tag) => value.tags?.includes(tag) ?? false
            );
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

    function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
        setPage(value)
    }

    const mainImages: ImageInformation[] = shownImages.filter(isImageInformation);
    const imagesOnPage = !(displayMode == 'all') ? mainImages.slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize) : mainImages;

    function closeModal() {
        setIsDialogOpen(false);
    }

    function handleImageClicked(value: ImageInformation) {
        setCurrentImage(value);
        setIsDialogOpen(true);
    }

    function getMonthsWhereImagesAreAvailable() {
        return getMonthYearPairsInImageSet(mainImages).size;
    }

    const content = <Fade in>
        <div>
            <Typography variant={"h3"} color={'var(--md-sys-color-primary)'} fontFamily={"Origin Tech"}>Alcor's Gallery</Typography>
            <GalleryDialog isOpen={isDialogOpen} currentImage={currentImage} closeModal={closeModal} alts={currentImage?.title !== undefined ? altData.get(currentImage.title) : undefined}/>
            <Grid container direction={"column"} spacing={2}>
                {/*TODO Make this use the same grid attributes as below*/}
                <Grid item md={3}/>
                <Grid item md style={{visibility: "hidden", width: "100%"}}>
                    <div ref={ref}>
                    </div>
                </Grid>
            </Grid>
            <Grid container direction={"column"} spacing={2}>
                <Grid item>
                </Grid>
                <Grid item style={{display: "flex", flexDirection: "column", overflow: "hidden"}}>
                    <Grid container justifyContent={'space-between'} alignItems={'flex-end'}>
                        <RadioGroup value={displayMode}>
                            <FormControlLabel value={'paginated'} control={<Radio onChange={(_event) => setDisplayMode('paginated')}/>}
                                              label="Display images in pages"/>
                            <FormControlLabel value={'all'} control={<Radio onChange={(_event) => setDisplayMode('all')}/>}
                                              label="Display all images on one page"/>
                            <FormControlLabel value={'monthly'} control={<Radio onChange={(_event) => setDisplayMode('monthly')}/>}
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


                    {displayMode === 'monthly' ?
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
                                containerStyle={{position: 'relative', height: '100%'}}
                                src={value.thumbnailUrl ?? value.src}
                                imageClassname={'artImage'}
                                aspectRatio={value.aspectRatio ?? 1}/>)}
                        </TSJustifiedLayout>
                    }
                </Grid>
            </Grid>
            <Uploader loadImageInfo={loadImageInfo}/>
        </div>
    </Fade>;
    return (
        <>
            <RouteWithSubpanel panel={<FilterPane isMediumOrAbove={isMediumOrAbove} filterCategories={filterCategories}/>} routeContent={content}/>
        </>
    );
}
