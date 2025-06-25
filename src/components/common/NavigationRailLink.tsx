import {Button} from "@mui/material-next";
import {Typography} from "@mui/material";

import {useLocation, useNavigate} from "react-router-dom";

export function NavigationRailLink(props: { button: React.ReactNode, selectedButton: React.ReactNode, label: string, path: string }) {
    const location = useLocation().pathname;
    const navigate = useNavigate();
    const topLevelPath = (location.match(/^\/[^/]*/) ?? [''])[0];
    const {path, button, label, selectedButton} = props;
    const isSelected = topLevelPath === path;
    return <div className={`navigation-rail-item ${isSelected && "selected-rail-item"}`} onClick={() => navigate(path)} style={{display: 'grid', alignItems: 'center'}}>
        <Button style={{height: '2rem', width: '3.5rem'}} color={"secondary"} variant={isSelected ? "filled" : "text"}>{isSelected ? selectedButton : button}</Button>
        <Typography style={{textAlign: "center"}} variant={"subtitle2"} className={'navigation-rail-text'}>{label}</Typography>
    </div>;
}