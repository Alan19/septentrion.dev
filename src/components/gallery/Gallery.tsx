import React, {useEffect, useState} from "react";
import Chip from '@mui/material-next/Chip';
import {Container, Fade, FormControlLabel, Grid, IconButton, Pagination, Switch, Typography, useMediaQuery,} from "@mui/material";
import {AltInformation, ArtTag, ImageInformation, isAltInformation, isImageInformation} from "../ImageInformation";
import {Remove,} from "@mui/icons-material";
import "./gallery.css";
import {theme} from "../../App";
import {useTagHooks} from "./UseTagHooks";
import Uploader from "./Uploader";
import useMeasure from 'react-use-measure';
import MenuIcon from '@mui/icons-material/Menu';
import {ResizeObserver} from '@juggle/resize-observer'
import ChronologicalGallery from "./ChronologicalGallery";
import {TSJustifiedLayout} from "react-justified-layout-ts";
import {GalleryImage} from "./GalleryImage";
import {GalleryDialog} from "./GalleryDialog";
import {ChipPropsColorOverrides} from "@mui/material-next/Chip/Chip.types";
import {OverridableStringUnion} from "@mui/types";
import {NavigationRail} from "../navigation/NavigationRail";
import {FilterPane, FilterPaneContent} from "./FilterPane";
import {FilterDrawer} from "./FilterDrawer";
import LZString from 'lz-string';

export type TagState = {
    [tag in ArtTag]: number;
};

export function hasAlts(title: string, images: (ImageInformation | AltInformation)[]): boolean {
    return images.filter(isAltInformation).some(value => value.parent === title);
}

export function getMonthYearPairsInImageSet(images: ImageInformation[]): Set<string> {
    // @ts-ignore
    return new Set(images.filter(value => value.published !== undefined).map(value => value.published.substring(0, 7)));
}

export function Gallery() {
    const {getTags, setTags, images, loadImageInfo, altData} = useTagHooks();
    const [currentImage, setCurrentImage] = useState<ImageInformation>();
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [ref, bounds] = useMeasure({polyfill: ResizeObserver})
    const [splitByMonth, setSplitByMonth] = useState(false);
    const [pageSize, setPageSize] = useState<number>(12);
    const [page, setPage] = useState<number>(1);
    const [displayAll, setDisplayAll] = useState(false);
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
    const imagesOnPage = !displayAll ? mainImages.slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize) : mainImages;

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
    function handleDrawerToggle() {
        setIsDrawerOpen(true)
    }

    function handleDrawerClose() {
        setIsDrawerOpen(false)
    }

    const encodedURL = LZString.compressToEncodedURIComponent(JSON.stringify(imagesOnPage.map(value => value.webp)));
    return (
        <NavigationRail secondPanel={<FilterPane isMediumOrAbove={isMediumOrAbove} filterCategories={filterCategories}/>}>
            <>
                {!isMediumOrAbove &&
                    <FilterDrawer
                        open={isDrawerOpen}
                        onClose={handleDrawerClose}>
                        <FilterPaneContent filterCategories={filterCategories}/>
                    </FilterDrawer>}

                <Fade in>
                    <div style={{display: "flex"}}>
                        <Container style={{flexGrow: 1, marginTop: '24px'}}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{mr: 2, display: {md: 'none'}}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant={"h3"} color={'var(--md-sys-color-primary)'} fontFamily={"Origin Tech"}>Alcor's Gallery</Typography>
                            <GalleryDialog isOpen={isDialogOpen} currentImage={currentImage} closeModal={closeModal}
                                           alts={currentImage?.title !== undefined ? altData.get(currentImage.title) : undefined}/>
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
                                    <FormControlLabel style={{marginTop: "8px"}}
                                                      control={<Switch value={splitByMonth}
                                                                       onChange={(_event, checked) => setSplitByMonth(checked)}/>}
                                                      label="Separate by month"/>

                                    {(pageSize < shownImages.length) && !splitByMonth &&
                                        <Grid container justifyContent={"space-between"}>

                                            <Grid item>
                                                <FormControlLabel style={{marginBottom: "8px"}}
                                                                  control={<Switch value={displayAll} onChange={(_event, checked) => setDisplayAll(checked)}/>}
                                                                  label="Display all images on one page"/>
                                            </Grid>
                                            {
                                                !displayAll && <Grid item>
                                                    <Pagination style={{marginBottom: "8px"}}
                                                                count={splitByMonth ? Math.ceil(getMonthsWhereImagesAreAvailable() / 4) : Math.ceil(shownImages.length / pageSize)}
                                                                page={page} onChange={handlePageChange} showFirstButton
                                                                showLastButton/>

                                                </Grid>
                                            }
                                        </Grid>}
                                    {splitByMonth ?
                                        <ChronologicalGallery displayedImages={shownImages} width={bounds.width}
                                                              setCurrentImage={handleImageClicked} altInfo={altData}/> :
                                        <TSJustifiedLayout width={bounds.width}
                                                           targetRowHeight={350}
                                                           rowSpacing={8}
                                                           itemSpacing={8}
                                                           layoutItems={imagesOnPage.map(value => (
                                                               value.aspectRatio ?? 1
                                                           ))}>
                                            {imagesOnPage.map(value => <GalleryImage
                                                src={value.thumbnailUrl ?? value.src}
                                                aspectRatio={value.aspectRatio ?? 1}
                                                className={"artImage"}
                                                setCurrentImage={() => handleImageClicked(value)}
                                                title={value.title ?? ""}
                                                hasAlts={altData.has(value.title)}/>)}
                                        </TSJustifiedLayout>
                                    }
                                </Grid>
                            </Grid>
                            <Uploader loadImageInfo={loadImageInfo}/>
                        </Container>
                    </div>
                </Fade>
            </>
        </NavigationRail>
    );
}
