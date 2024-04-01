import {Container, IconButton, Snackbar, Typography, useMediaQuery} from "@mui/material";
import React, {createContext, useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import './form-page.css'
import {NavigationRail} from "../navigation/NavigationRail";
import {AlcorLorePane} from "./AlcorLorePane";
import {FilterDrawer} from "../gallery/FilterDrawer";
import {theme} from "../../App";
import MenuIcon from "@mui/icons-material/Menu";

// @ts-ignore
export const CopyColorContext: React.Context<[string, (color: string) => void]> = createContext(undefined)

export function CharacterAttribute(props: { fieldName: string, fieldValue: string }) {
    return <div>
        <Typography variant={"h6"}>{props.fieldName}</Typography>
        <Typography variant={"subtitle1"}>{props.fieldValue}</Typography>
    </div>;
}

export function getPageHeader(title: string) {
    return <Typography variant={"h3"} style={{marginBottom: '8px'}} color={'var(--md-sys-color-primary)'} fontFamily={"Origin Tech"}>{title}</Typography>;
}

export function AboutPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [copiedColor, setCopiedColor] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);

    const isMediumOrAbove = useMediaQuery(theme.breakpoints.up("md"));

    function handleDrawerClose() {
        setIsDrawerOpen(false)
    }

    const handleClick = (color: string) => {
        setCopiedColor(color)
    };

    useEffect(() => {
        if (copiedColor !== '') {
            setIsOpen(true)
        }
    }, [copiedColor]);

    function handleDrawerToggle() {
        setIsDrawerOpen(true)
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
    };
    return (
        <NavigationRail secondPanel={<AlcorLorePane/>}>
            <CopyColorContext.Provider value={[copiedColor, handleClick]}>
                <Snackbar
                    open={isOpen}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={`Copied ${copiedColor} to clipboard`}
                />
                {!isMediumOrAbove &&
                    <FilterDrawer
                        open={isDrawerOpen}
                        onClose={handleDrawerClose}>
                        <AlcorLorePane/>
                    </FilterDrawer>}
                <Container style={{paddingTop: '24px'}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {md: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Outlet/>
                </Container>
            </CopyColorContext.Provider>
        </NavigationRail>
    );
}