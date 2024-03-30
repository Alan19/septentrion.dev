import {Divider, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material-next";
import React from "react";
import ListItemButton from "@mui/material-next/ListItemButton";
import {Avatar, Collapse} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import {alcorForms} from "./form-icons/alcorForms";

export function AlcorLoreDrawer() {
    // TODO Fix height on mobile version
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
        <List style={{width: 'max-content', paddingLeft: 8, paddingRight: 8}}>
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