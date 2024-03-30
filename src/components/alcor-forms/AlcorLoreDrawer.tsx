import {Divider, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material-next";
import React from "react";
import ListItemButton from "@mui/material-next/ListItemButton";
import {Avatar, Collapse} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import {alcorForms} from "./form-icons/alcorForms";

export function AlcorLoreDrawer() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation().pathname;

    const handleClick = () => {
        setOpen(!open);
    };

    const borderRadius = 'var(--Button-radius, var(--md-sys-shape-corner-full))';

    function getLinkButtonStyle(link: string = '') {
        let baseUrl: string;
        baseUrl = link === '' ? '/about' : "/about/";
        return {
            borderRadius,
            ...(location === `${baseUrl}${link}` ? {backgroundColor: 'var(--md-sys-color-primaryContainer)'} : {})
        };
    }

    return <>
        <List style={{width: 'max-content', paddingLeft: 8, paddingRight: 8}}>
            <ListItem>
                <ListItemText secondary={"Alcor's World"}/>
            </ListItem>
            <ListItemButton style={{borderRadius}} onClick={handleClick}>
                <ListItemText primary={"Alternate Formes"}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} timeout="auto">
                <ListItemButton style={getLinkButtonStyle()} onClick={() => navigate('')}>
                    <ListItemText primary={"Introduction"}/>
                </ListItemButton>
                <List component="div" disablePadding>
                    {alcorForms.map(value => <ListItemButton style={getLinkButtonStyle(value.link)} sx={{pl: 4}} onClick={() => navigate(value.link)}>
                        <ListItemAvatar>
                            <Avatar src={value.thumbnail}/>
                        </ListItemAvatar>
                        <ListItemText primary={value.name}/>
                    </ListItemButton>)}
                </List>
            </Collapse>
            <ListItemButton>
                <ListItemText primary={"Outfits"}/>
            </ListItemButton>
            <Divider color={"--md-sys-color-onSurfaceVariant"} variant={"middle"}/>
            <ListItem>
                <ListItemText secondary={"Other OCs"}/>
            </ListItem>
            <ListItemButton>
                <ListItemText primary={"Soma"}/>
            </ListItemButton>
            <ListItemButton>
                <ListItemText primary={"Wilton"}/>
            </ListItemButton>
        </List>
    </>;
}