import {Button} from "@mui/material-next";
import {Typography} from "@mui/material";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

export function NavigationRailItem(props: { button: React.ReactNode, label: string, path: string }) {
    const location = useLocation().pathname;
    const navigate = useNavigate();
    return <div className={`navigation-rail-item ${location === props.path && "selected-rail-item"}`} onClick={() => navigate(props.path)}>
        <Button variant={location === props.path ? "filledTonal" : "text"}>{props.button}</Button>
        <Typography style={{textAlign: "center"}} variant={"subtitle2"}
                    className={'navigation-rail-text'}>{props.label}</Typography>
    </div>;
}