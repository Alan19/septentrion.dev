import React, {useState} from "react";
import {Chip, Grid, ImageList, ImageListItem, Paper, Typography, useMediaQuery} from "@mui/material";
import {ArtTag, ImageData} from "../ImageData";
import {CategoryOutlined, DryCleaningOutlined, Filter, PetsOutlined, Remove} from "@mui/icons-material";
import "./gallery.css";
import {theme} from "../../App";
import images from './images.json';

export function Gallery() {
    type TagState = {
        [tag in ArtTag]: number;
    };

    const [tags, setTags] = useState<TagState>(Object.values(ArtTag).reduce((previousValue, currentValue) => {
        return {
            ...previousValue,
            [currentValue]: false
        }
    }, {}) as TagState);

    const enabledTags: ArtTag[] = Object.keys(tags).filter(value => tags[value as ArtTag] === 1) as ArtTag[];
    const hiddenTags: ArtTag[] = Object.keys(tags).filter(value => tags[value as ArtTag] === -1) as ArtTag[];

    function toggleHide(tagName: ArtTag) {
        if (tags[tagName] !== 1) {
            setTags({...tags, [tagName]: 1})

        }
        else {
            setTags({...tags, [tagName]: 0})
        }
    }

    function filterTag(tagName: ArtTag) {
        if (tags[tagName] !== -1){
            setTags({...tags, [tagName]: -1})
        }
        else {
            setTags({...tags, [tagName]: 0})
        }
    }

    function filterCategories(element: JSX.Element, categoryname: string, filterFunction: (value: ArtTag) => boolean) {
        function getColor(tag: ArtTag) {
            switch (tags[tag]) {
                case 1:
                    return "primary";
                case -1:
                    return "error"
                default:
                    return "default";
            }
        }

        return <>
            <Typography variant={"h6"} style={{marginTop: "8px"}}>{element} {categoryname}</Typography>
            <Grid container direction={"row"} spacing={1}>
                {Object.values(ArtTag).filter(filterFunction).map(tag => <Grid item>
                    <Chip label={tag}
                          onClick={() => toggleHide(tag)}
                          variant={tags[tag] ? "filled" : "outlined"}
                          deleteIcon={<Remove />}
                          onDelete={() => filterTag(tag)}
                          color={getColor(tag)}/>
                </Grid>)}
            </Grid>
        </>;
    }

    const itemData: ImageData[] = images;
    let shownImages = itemData.filter(value => {
        const hasFilterTag = enabledTags.some(tag => value.tags?.includes(tag) ?? false);
        const hasHiddenTag = hiddenTags.some(tag => value.tags?.includes(tag) ?? false);
        if (enabledTags.length === 0) {
            return !hasHiddenTag;
        } else {
            return hasFilterTag && !hasHiddenTag;
        }
    });
    const isSmallOrAbove = useMediaQuery(theme.breakpoints.up('sm'));
    const isMediumOrAbove = useMediaQuery(theme.breakpoints.up('md'));

    function getCols() {
        if (isMediumOrAbove) {
            return 4;
        }
        else if (isSmallOrAbove) {
            return 3;
        }
        else {
            return 1;
        }
    }

    return <>
        <Grid container spacing={2}>
            <Grid item md={3}>
                <Paper elevation={3} className={`filters ${isMediumOrAbove ? 'medium' : ''}`}>
                    <Typography variant={"h5"} style={{marginTop: "8px"}}><Filter/> Filter Gallery</Typography>
                    {filterCategories(<PetsOutlined/>, "Forms", value => value.includes("Form"))}
                    {filterCategories(<DryCleaningOutlined/>, "Superhero Suits", value => value.includes("Suit"))}
                    {filterCategories(<CategoryOutlined/>, "Miscellaneous", value => !["Suit", "Form"].some(keyword => value.includes(keyword)))}
                </Paper>
            </Grid>
            <Grid item md>
                <ImageList variant={"masonry"} cols={getCols()} gap={8} >
                    {
                        shownImages.map(value =>
                            <ImageListItem key={value.title}>
                                <img
                                    src={value.src}
                                    alt={value.title}
                                    loading={"lazy"}
                                    onClick={() => window.open(value.href, "_blank")}
                                    className={"artImage"}
                                />
                            </ImageListItem>)
                    }
                </ImageList>
            </Grid>
        </Grid>
    </>;
}