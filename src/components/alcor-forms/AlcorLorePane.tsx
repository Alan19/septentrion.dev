import {Divider, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material-next";
import React from "react";
import ListItemButton from "@mui/material-next/ListItemButton";
import {Avatar, Collapse} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import {alcorForms} from "./form-icons/alcorForms";

export function AlcorLorePane() {
    // TODO Fix height on mobile version
    // TODO align text with M3 website
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

    function getListItemButton(link: string, text: string, indentation = 0, avatarSrc?: string) {
        const sx = indentation !== 0 ? {pl: indentation} : {};
        return <ListItemButton style={getLinkButtonStyle(link)} {...{sx}} onClick={() => navigate(link)}>
            {avatarSrc &&
                <ListItemAvatar>
                    <Avatar src={avatarSrc}/>
                </ListItemAvatar>
            }
            <ListItemText primary={text}/>
        </ListItemButton>;
    }

    return <>
        <List style={{width: 'max-content', padding: "24px 16px 16px", position: "sticky", height: "100vh", top: 0, overflowY: "auto"}}>
            <ListItem>
                <ListItemText secondary={"Into the Alcorverse"}/>
            </ListItem>
            {getListItemButton('', "Alcor's World")}
            {getListItemButton('bio-enhancement', "Bio-Enhancement")}
            <ListItemButton style={{borderRadius}} onClick={handleClick}>
                <ListItemText primary={"Alternate Formes"}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} timeout="auto">
                <List component="div" disablePadding>
                    {alcorForms.map(value => getListItemButton(value.link, value.name, 4, value.thumbnail))}
                </List>
            </Collapse>
            <ListItemButton>
                <ListItemText primary={"Outfits"}/>
            </ListItemButton>
            <Divider color={"--md-sys-color-onSurfaceVariant"} variant={"middle"}/>
            <ListItem>
                <ListItemText secondary={"TTRPG Characters"}/>
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