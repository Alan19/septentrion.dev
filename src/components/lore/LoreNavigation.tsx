import {Divider, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material-next";
import React, {memo} from "react";
import ListItemButton from "@mui/material-next/ListItemButton";
import {Avatar, Collapse} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {Link, useLocation} from "react-router-dom";
import alcorIcon from './assets/icons/alcor_icon.png'
import castorIcon from './assets/icons/castor_icon.png'
import {templatedLorePageInfo} from "./characters/template-info/alcor-forms";
import {superheroSuits} from "./characters/template-info/superhero-suits";

function M3ListButton(props: Readonly<{ avatarSrc?: string, indentation?: number, text: string, link: string }>) {
    const borderRadius = 'var(--Button-radius, var(--md-sys-shape-corner-full))';
    const location = useLocation().pathname;

    function getLinkButtonStyle(link: string = '') {
        const baseUrl: string = link === '' ? '/lore' : "/lore/";
        return {
            borderRadius,
            ...(location === `${baseUrl}${link}` ? {backgroundColor: 'var(--md-sys-color-secondaryContainer)'} : {})
        };
    }

    return <Link to={props.link} style={{display: 'flex', alignItems: 'center', width: '100%', height: '100%', color: 'var(--md-palette-text-primary)'}}>
        <ListItemButton style={getLinkButtonStyle(props.link)} {...{sx: props.indentation ? {pl: props.indentation} : {}}}>
            {props.avatarSrc &&
                <ListItemAvatar>
                    <Avatar src={props.avatarSrc}/>
                </ListItemAvatar>
            }
            <ListItemText primary={props.text}/>
        </ListItemButton></Link>;
}

function CollapsibleListButton(props: Readonly<{ title: string, children: React.JSX.Element[], forceOpen?: boolean }>) {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleClick = () => {
        if (!forceOpen) {
            setIsOpen(!isOpen);
        }
    };

    const {forceOpen = false, children, title} = props;
    return <>
        <ListItemButton style={{borderRadius: 'var(--Button-radius, var(--md-sys-shape-corner-full))'}} onClick={handleClick} disabled={forceOpen}>
            <ListItemText primary={title}/>
            {isOpen ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>
        <Collapse in={isOpen} timeout="auto">
            <List component="div" disablePadding>
                {children.map((child) => child)}
            </List>
        </Collapse>
    </>;
}

export const LoreNavigation = memo(function AlcorLorePane() {
    return <List>
        <M3ListButton link={""} text={"Home"}/>
        <Divider color={"--md-sys-color-onSurfaceVariant"} variant={"middle"}/>
        <ListItem>
            <ListItemText secondary={"Into the Alcorverse"}/>
        </ListItem>
        <CollapsibleListButton title={"Main OCs"}>
            <M3ListButton text={'Alcor'} link={'alcor'} avatarSrc={alcorIcon} indentation={4}/>
            <M3ListButton text={'Castor'} link={'castor'} indentation={4} avatarSrc={castorIcon}/>
        </CollapsibleListButton>
        <M3ListButton link={"world"} text={"Alcor's World"}/>
        <M3ListButton text={"Bio-Enhancement"} link={"bio-enhancement"}/>
        <CollapsibleListButton title={"Alternate Formes"}>
            {templatedLorePageInfo.map(value => <M3ListButton text={value.name} link={value.link} avatarSrc={value.thumbnail} indentation={4}/>)}
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