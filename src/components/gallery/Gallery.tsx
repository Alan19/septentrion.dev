import React, {useState} from "react";
import {
    Button,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    ImageList,
    ImageListItem,
    Pagination,
    Paper,
    Typography,
    useMediaQuery,
} from "@mui/material";
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
    const [currentImage, setCurrentImage] = useState<ImageData>();
    const {getTags, setTags, images, loadImageInfo} = useTagHooks();

    const portrait = useMediaQuery('(orientation: portrait)');

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
    const [pageSize, setPageSize] = useState<number>(12);
    const [page, setPage] = useState<number>(1);

    function getCols() {
        if (isMediumOrAbove) {
            return 4;
        } else if (isSmallOrAbove) {
            return 3;
        } else {
            return 1;
        }
    }

    function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
        setPage(value)
    }

    return (
        <>
            <Typography variant={"h3"} fontFamily={"Origin Tech"}>Alcor's Gallery</Typography>
            <Dialog
                open={!!currentImage}
                onClose={() => setCurrentImage(undefined)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                fullWidth={true}
                maxWidth={"lg"}
            >
                <DialogTitle>
                    <Typography variant={"h4"}>{currentImage?.title}</Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container direction={portrait ? 'column' : 'row'} spacing={2}>
                        {currentImage && (
                            <Grid
                                item
                                md={8}
                                sm={7}
                                xs
                                className={"artImage"}
                            >
                                <a href={(currentImage.href && currentImage.href !== '') ? currentImage.href : currentImage.src}
                                   target={"_blank"} style={{width: "100%", display: "flex"}}>
                                    <img
                                        src={currentImage.src}
                                        alt={currentImage.title}
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: portrait ? "inherit" : "80vh",
                                            alignSelf: "center",
                                            margin: "auto",
                                            objectFit: "contain"
                                        }}
                                        loading={"lazy"}
                                    />
                                </a>
                            </Grid>
                        )}
                        <Grid item md={4} xs sm={5} style={{paddingLeft: "16px", paddingRight: "16px"}}>
                            <Button color="primary" variant="outlined">Artist: {currentImage?.artist}</Button>
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
                                        right: 24,
                                        bottom: 8,
                                    }}
                                >
                                    {dayjs(currentImage?.published).format("MMM DD, YYYY")}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
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
                    {(pageSize < shownImages.length) && <Pagination style={{marginTop: '8px'}} count={Math.ceil(shownImages.length / pageSize)} page={page} onChange={handlePageChange} showFirstButton showLastButton/>}
                    <ImageList variant={"standard"} cols={getCols()} gap={8}>
                        {shownImages.slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize).map((value) => (
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
