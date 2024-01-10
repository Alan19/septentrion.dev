import {Paper, Typography} from "@mui/material";
import {CategoryOutlined, DryCleaningOutlined, Filter, PetsOutlined} from "@mui/icons-material";
import React from "react";
import {ArtTag} from "../ImageInformation";

export function FilterPane(props: {
    isMediumOrAbove: boolean, filterCategories: (element: React.JSX.Element,
                                                 categoryName: string,
                                                 filterFunction: (value: ArtTag) => boolean) => React.JSX.Element
}) {
    return <Paper
        elevation={3}
        className={`filters ${props.isMediumOrAbove ? "medium" : ""}`}
    >
        <Typography variant={"h5"} style={{marginTop: "8px"}}>
            <Filter/> Filter Gallery
        </Typography>
        {props.filterCategories(<PetsOutlined/>, "Forms", (value) =>
            value.includes("Form")
        )}
        {props.filterCategories(
            <DryCleaningOutlined/>,
            "Superhero Suits",
            (value) => value.includes("Suit")
        )}
        {props.filterCategories(
            <CategoryOutlined/>,
            "Miscellaneous",
            (value) =>
                !["Suit", "Form"].some((keyword) => value.includes(keyword))
        )}
    </Paper>
}