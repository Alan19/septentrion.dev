import {Divider, Typography} from "@mui/material";
import {CategoryOutlined, Filter, PetsOutlined} from "@mui/icons-material";
import React from "react";
import {ArtTag} from "../ImageInformation";
import {faMask} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function FilterPaneContent(props: {
    filterCategories: (element: React.JSX.Element,
                       categoryName: string,
                       filterFunction: (value: ArtTag) => boolean) => React.JSX.Element
}) {
    return <>
        <Typography variant={"h5"} style={{marginTop: "8px"}}>
            <Filter/> Filter Gallery
        </Typography>
        <Divider style={{marginTop: '8px'}}/>
        {props.filterCategories(<PetsOutlined/>, "Forms", (value) =>
            value.includes("Form")
        )}
        {props.filterCategories(
            <FontAwesomeIcon icon={faMask} style={{width: 24, height: 24}}/>,
            "Superhero Suits",
            (value) => value.includes("Suit")
        )}
        {props.filterCategories(
            <CategoryOutlined/>,
            "Miscellaneous",
            (value) =>
                !["Suit", "Form"].some((keyword) => value.includes(keyword))
        )}
    </>
}

export function FilterPane(props: {
    isMediumOrAbove: boolean,
    filterCategories: (element: React.JSX.Element,
                       categoryName: string,
                       filterFunction: (value: ArtTag) => boolean) => React.JSX.Element
}) {
    return <div className={`filters ${props.isMediumOrAbove ? "medium" : ""}`}>
        <FilterPaneContent filterCategories={props.filterCategories}/>
    </div>;

}