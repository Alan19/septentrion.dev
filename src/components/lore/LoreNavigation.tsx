import {Divider, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material-next";
import React, {memo} from "react";
import ListItemButton from "@mui/material-next/ListItemButton";
import {Avatar, Collapse} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import {alcorForms, superheroSuits} from "./characters/alcorForms";

function M3ListButton(props: { avatarSrc?: string, indentation?: number, text: string, link: string }) {
    const borderRadius = 'var(--Button-radius, var(--md-sys-shape-corner-full))';
    const location = useLocation().pathname;
    const navigate = useNavigate();

    function getLinkButtonStyle(link: string = '') {
        let baseUrl: string;
        baseUrl = link === '' ? '/about' : "/about/";
        return {
            borderRadius,
            ...(location === `${baseUrl}${link}` ? {backgroundColor: 'var(--md-sys-color-secondaryContainer)'} : {})
        };
    }

    return <ListItemButton style={getLinkButtonStyle(props.link)} {...{sx: props.indentation ? {pl: props.indentation} : {}}} onClick={event => navigate(`${props.link}`)}>
        {props.avatarSrc &&
            <ListItemAvatar>
                <Avatar src={props.avatarSrc}/>
            </ListItemAvatar>
        }
        <ListItemText primary={props.text}/>
    </ListItemButton>;
}

function CollapsibleListButton(props: { title: string, children: React.JSX.Element[] }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return <>
        <ListItemButton style={{borderRadius: 'var(--Button-radius, var(--md-sys-shape-corner-full))'}} onClick={handleClick}>
            <ListItemText primary={props.title}/>
            {isOpen ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>
        <Collapse in={isOpen} timeout="auto">
            <List component="div" disablePadding>
                {props.children.map((child) => child)}
            </List>
        </Collapse>
    </>;
}

export const LoreNavigation = memo(function AlcorLorePane() {
    // TODO Fix height on mobile version
    // TODO Switch to using proper links
    // TODO Fix highlighting
    return <List>
        <ListItem>
            <ListItemText secondary={"Into the Alcorverse"}/>
        </ListItem>
        <M3ListButton link={"world"} text={"Alcor's World"}/>
        <M3ListButton text={"Bio-Enhancement"} link={"bio-enhancement"}/>
        <CollapsibleListButton title={"Alternate Formes"}>
            {alcorForms.map(value => <M3ListButton text={value.name} link={value.link} avatarSrc={value.thumbnail} indentation={4}/>)}
        </CollapsibleListButton>
        <CollapsibleListButton title={"Superhero Suits"}>
            {superheroSuits.map(value => <M3ListButton text={value.name} link={value.link} avatarSrc={value.thumbnail} indentation={4}/>)}
        </CollapsibleListButton>
        <M3ListButton text={"Alcor's Wardrobe"} link={"outfits"}/>
        <Divider color={"--md-sys-color-onSurfaceVariant"} variant={"middle"}/>
        <ListItem>
            <ListItemText secondary={"TTRPG Characters"}/>
        </ListItem>
        <M3ListButton text={"Soma"} link={"soma"}/>
        <ListItemButton>
            <ListItemText primary={"Wilton"}/>
        </ListItemButton>
    </List>;
});