import React from "react";
import {ArtTag} from "../ImageInformation";
import {OverridableStringUnion} from "@mui/types";
import {ChipPropsColorOverrides} from "@mui/material-next/Chip/Chip.types";
import {Grid, Typography} from "@mui/material";
import Chip from "@mui/material-next/Chip";
import {Remove} from "@mui/icons-material";
import {TagState} from "./Gallery";

export function FilterCategories({categoryName, element, filterFunction, filterTag, tags, toggleHide}: {
                                     element: React.JSX.Element,
                                     categoryName: string,
                                     filterFunction: (value: ArtTag) => boolean,
                                     tags: TagState,
                                     toggleHide: (tag: ArtTag) => void,
                                     filterTag: (tag: ArtTag) => void
                                 }
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