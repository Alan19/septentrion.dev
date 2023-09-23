import React, {useState} from "react";
import {Box, Chip, Grid, ImageList, ImageListItem, Modal, Paper, Typography, useMediaQuery,} from "@mui/material";
import {ArtTag, ImageData} from "../ImageData";
import {CategoryOutlined, DryCleaningOutlined, Filter, PetsOutlined, Remove,} from "@mui/icons-material";
import "./gallery.css";
import {theme} from "../../App";
import {useTagHooks} from "./UseTagHooks";
import Uploader from "./Uploader";
import dayjs from "dayjs";

export type TagState = {
    [tag in ArtTag]: number;
};

export function Gallery() {
    const {getTags, setTags, images, loadImageInfo} = useTagHooks();
    const [currentImage, setCurrentImage] = useState<ImageData>();
    const portrait = useMediaQuery('(orientation: portrait)');

    let tags: TagState = getTags();

    const enabledTags: ArtTag[] = Object.keys(tags).filter(
        (value) => tags[value as ArtTag] === 1
    ) as ArtTag[];
    const hiddenTags: ArtTag[] = Object.keys(tags).filter(
        (value) => tags[value as ArtTag] === -1
    ) as ArtTag[];

    function toggleHide(tagName: ArtTag) {
        if (tags[tagName] !== 1) {
            setTags({...tags, [tagName]: 1});
        } else {
            setTags({...tags, [tagName]: 0});
        }
    }

    function filterTag(tagName: ArtTag) {
        if (tags[tagName] !== -1) {
            setTags({...tags, [tagName]: -1});
        } else {
            setTags({...tags, [tagName]: 0});
        }
    }

    function filterCategories(
        element: JSX.Element,
        categoryName: string,
        filterFunction: (value: ArtTag) => boolean
    ) {
        function getColor(tag: ArtTag) {
            switch (tags[tag]) {
                case 1:
                    return "primary";
                case -1:
                    return "error";
                default:
                    return "default";
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

    function imageSort(a: ImageData, b: ImageData) {
        // const aFeatured = a.tags?.includes("Featured");
        // const bFeatured = b.tags?.includes("Featured");
        // if (aFeatured != bFeatured) {
        //     if (aFeatured) {
        //         return -1;
        //     }
        //     if (bFeatured) {
        //         return 1;
        //     }
        // }
        return dayjs(b.published).unix() - dayjs(a.published).unix();
    }

    const isSmallOrAbove = useMediaQuery(theme.breakpoints.up("sm"));
    const isMediumOrAbove = useMediaQuery(theme.breakpoints.up("md"));

    function getCols() {
        if (isMediumOrAbove) {
            return 4;
        } else if (isSmallOrAbove) {
            return 3;
        } else {
            return 1;
        }
    }

    return (
        <>
            <Modal
                open={!!currentImage}
                onClose={() => setCurrentImage(undefined)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute" as "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        height: "80%",
                        minWidth: "80%",
                    }}
                >
                    <Grid container style={{height: "100%"}} direction={portrait ? 'column' : 'row'}>
                        {currentImage && (
                            <Grid
                                item
                                md={9}
                                sm={7}
                                xs={5}
                                style={{
                                    display: "flex",
                                    backgroundColor: "black",
                                    height: "100%",
                                }}
                                className={"artImage"}
                            >
                                <a href={currentImage.href} target={"_blank"} style={{width: "100%", display: "flex"}}>
                                    <img
                                        src={currentImage.src}
                                        alt={currentImage.title}
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            alignSelf: "center",
                                            margin: "auto"
                                        }}
                                        loading={"lazy"}
                                    />
                                </a>
                            </Grid>
                        )}
                        <Grid item md={3} xs={6} sm={5} style={{padding: "16px"}}>
                            <Typography variant={"h4"}>{currentImage?.title}</Typography>
                            <Typography variant={"subtitle1"}>
                                Artist: {currentImage?.artist}
                            </Typography>
                            <Grid container direction={"row"} spacing={1}>
                                {currentImage?.tags?.map((value) => (
                                    <Grid item>
                                        <Chip label={value}/>
                                    </Grid>
                                ))}
                            </Grid>
                            {currentImage?.published && (
                                <Typography
                                    variant={"subtitle1"}
                                    style={{
                                        position: "absolute",
                                        right: 8,
                                        bottom: 8,
                                    }}
                                >
                                    {dayjs(currentImage?.published).format("MMM DD, YYYY")}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <Grid container spacing={2}>
                <Grid item md={3}>
                    <Paper
                        elevation={3}
                        className={`filters ${isMediumOrAbove ? "medium" : ""}`}
                    >
                        <Typography variant={"h5"} style={{marginTop: "8px"}}>
                            <Filter/> Filter Gallery
                        </Typography>
                        {filterCategories(<PetsOutlined/>, "Forms", (value) =>
                            value.includes("Form")
                        )}
                        {filterCategories(
                            <DryCleaningOutlined/>,
                            "Superhero Suits",
                            (value) => value.includes("Suit")
                        )}
                        {filterCategories(
                            <CategoryOutlined/>,
                            "Miscellaneous",
                            (value) =>
                                !["Suit", "Form"].some((keyword) => value.includes(keyword))
                        )}
                    </Paper>
                </Grid>
                <Grid item md>
                    <ImageList variant={"masonry"} cols={getCols()} gap={8}>
                        {shownImages.map((value) => (
                            <ImageListItem key={value.title}>
                                <img
                                    src={value.thumbnailUrl ?? value.src}
                                    alt={value.title}
                                    loading={"lazy"}
                                    onClick={() => setCurrentImage(value)}
                                    className={"artImage"}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
            </Grid>
            <Uploader loadImageInfo={loadImageInfo}/>
        </>
    );
}
