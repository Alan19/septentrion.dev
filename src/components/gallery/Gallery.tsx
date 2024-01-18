import React, {useState} from "react";
import Chip from '@mui/material-next/Chip';
import {FormControlLabel, Grid, Pagination, Switch, Typography, useMediaQuery,} from "@mui/material";
import {ArtTag, ImageInformation} from "../ImageInformation";
import {Remove,} from "@mui/icons-material";
import "./gallery.css";
import {theme} from "../../App";
import {useTagHooks} from "./UseTagHooks";
import Uploader from "./Uploader";
import dayjs from "dayjs";
import useMeasure from 'react-use-measure';

import {ResizeObserver} from '@juggle/resize-observer'
import ChronologicalGallery from "./ChronologicalGallery";
import {TSJustifiedLayout} from "react-justified-layout-ts";
import {GalleryImage} from "./GalleryImage";
import {GalleryDialog} from "./GalleryDialog";
import {FilterPane} from "./FilterPane";
import {ChipPropsColorOverrides} from "@mui/material-next/Chip/Chip.types";
import {OverridableStringUnion} from "@mui/types";

export type TagState = {
    [tag in ArtTag]: number;
};

export function Gallery() {
    const {getTags, setTags, images, loadImageInfo} = useTagHooks();
    const [currentImage, setCurrentImage] = useState<ImageInformation>();
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [ref, bounds] = useMeasure({polyfill: ResizeObserver})
    const [splitByMonth, setSplitByMonth] = useState(false);
    const [pageSize, setPageSize] = useState<number>(12);
    const [page, setPage] = useState<number>(1);


    let tags: TagState = getTags();

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
        return dayjs(b.published).unix() - dayjs(a.published).unix();
    }

    const isMediumOrAbove = useMediaQuery(theme.breakpoints.up("md"));

    function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
        setPage(value)
    }

    const imagesOnPage = shownImages.slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize);

    function closeModal() {
        setIsDialogOpen(false);
    }

    function handleImageClicked(value: ImageInformation) {
        setCurrentImage(value);
        setIsDialogOpen(true);
    }

    return (
        <>
            <Typography variant={"h3"} fontFamily={"Origin Tech"}>Alcor's Gallery</Typography>
            <GalleryDialog isOpen={isDialogOpen} currentImage={currentImage} closeModal={closeModal}/>
            <Grid container spacing={2}>
                <Grid item md={3}/>
                <Grid item md style={{visibility: "hidden", width: "100%"}}>
                    <div ref={ref}>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={3}>
                    <FilterPane isMediumOrAbove={isMediumOrAbove} filterCategories={filterCategories}/>
                </Grid>
                <Grid item md style={{display: "flex", flexDirection: "column", overflow: "hidden"}}>
                    <FormControlLabel style={{marginTop: "8px"}}
                                      control={<Switch value={splitByMonth}
                                                       onChange={(_event, checked) => setSplitByMonth(checked)}/>}
                                      label="Separate by month"/>

                    {(pageSize < shownImages.length) &&
                        <Pagination style={{marginBottom: "8px"}}
                                    count={Math.ceil(shownImages.length / pageSize)}
                                    page={page} onChange={handlePageChange} showFirstButton showLastButton/>}
                    {splitByMonth ?
                        <ChronologicalGallery displayedImages={imagesOnPage} width={bounds.width}
                                              setCurrentImage={handleImageClicked}/> :
                        <TSJustifiedLayout width={bounds.width}
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
                                title={value.title ?? ""}/>)}
                        </TSJustifiedLayout>
                    }

                </Grid>
            </Grid>
            <Uploader loadImageInfo={loadImageInfo}/>
        </>
    );
}
