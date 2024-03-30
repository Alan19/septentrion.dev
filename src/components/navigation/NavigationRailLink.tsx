import {Button} from "@mui/material-next";
import {Typography} from "@mui/material";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

export function NavigationRailLink(props: { button: React.ReactNode, label: string, path: string }) {
    const location = useLocation().pathname;
    const navigate = useNavigate();
    const topLevelPath = (location.match(/^\/[^\/]*/) ?? [''])[0];
    return <div className={`navigation-rail-item ${topLevelPath === props.path && "selected-rail-item"}`} onClick={() => navigate(props.path)} style={{display: 'grid', alignItems: 'center'}}>
        <Button variant={topLevelPath === props.path ? "filledTonal" : "text"}>{props.button}</Button>
        <Typography style={{textAlign: "center"}} variant={"subtitle2"} className={'navigation-rail-text'}>{props.label}</Typography>
    </div>;
}