import React, {useState} from "react";
import {Chip, Grid, ImageList, ImageListItem, Paper, Typography, useMediaQuery} from "@mui/material";
import {ArtTag} from "../ImageData";
import {
    Category,
    CategoryOutlined,
    DryCleaning,
    DryCleaningOutlined,
    Filter,
    Pets,
    PetsOutlined
} from "@mui/icons-material";
import {itemData} from "./images";
import "./gallery.css";
import {theme} from "../../App";

export function Gallery() {
    type TagState = {
        [tag in ArtTag]: boolean;
    };

    const [tags, setTags] = useState<TagState>(Object.values(ArtTag).reduce((previousValue, currentValue) => {
        return {
            ...previousValue,
            [currentValue]: false
        }
    }, {}) as TagState);

    const enabledTags: ArtTag[] = Object.keys(tags).filter(value => tags[value as ArtTag]) as ArtTag[];

    function toggleTag(tagName: ArtTag) {
        const newVal = !tags[tagName];
        setTags({...tags, [tagName]: newVal})
    }

    function filterCategories(element: JSX.Element, categoryname: string, filterFunction: (value: ArtTag) => boolean) {
        return <>
            <Typography variant={"h6"} style={{marginTop: "8px"}}>{element} {categoryname}</Typography>
            <Grid container direction={"row"} spacing={1}>
                {Object.values(ArtTag).filter(filterFunction).map(tag => <Grid item>
                    <Chip label={tag}
                          onClick={() => toggleTag(tag)}
                          variant={tags[tag] ? "filled" : "outlined"}
                          color={tags[tag] ? "primary" : "default"}/>
                </Grid>)}
            </Grid>
        </>;
    }

    let shownImages = itemData.filter(value => enabledTags.length === 0 ? true : enabledTags.some(tag => value.tags?.includes(tag) ?? false));
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
                <ImageList variant={"masonry"} cols={getCols()} gap={8}>
                    {
                        shownImages.map(value =>
                            <ImageListItem key={value.title}>
                                <img
                                    src={value.img}
                                    alt={value.title}
                                    loading={"lazy"}
                                    onClick={() => window.open(value.source, "_blank")}
                                    className={"artImage"}
                                />
                            </ImageListItem>)
                    }
                </ImageList>
            </Grid>
        </Grid>
    </>;
}