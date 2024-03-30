import {Container, IconButton, Typography, useMediaQuery} from "@mui/material";
import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import './form-page.css'
import {NavigationRail} from "../navigation/NavigationRail";
import {AlcorLoreDrawer} from "./AlcorLoreDrawer";
import {FilterDrawer} from "../gallery/FilterDrawer";
import {theme} from "../../App";
import MenuIcon from "@mui/icons-material/Menu";

export function CharacterAttribute(props: { fieldName: String, fieldValue: String }) {
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
    const isMediumOrAbove = useMediaQuery(theme.breakpoints.up("md"));

    function handleDrawerClose() {
        setIsDrawerOpen(false)
    }

    function handleDrawerToggle() {
        setIsDrawerOpen(true)
    }

    return (
        <NavigationRail secondPanel={<AlcorLoreDrawer/>}>
            <>
                {!isMediumOrAbove &&
                    <FilterDrawer
                        open={isDrawerOpen}
                        onClose={handleDrawerClose}>
                        <AlcorLoreDrawer/>
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
            </>
        </NavigationRail>
    );
}