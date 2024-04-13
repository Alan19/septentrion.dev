import React, {useState} from "react";
import {Divider} from "@mui/material-next";
import {Container, Fade, IconButton, useMediaQuery} from "@mui/material";
import {theme} from "../../App";
import {RouteDrawer} from "./RouteDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import {drawerColor} from "./NavigationRail";

export function RouteWithSubpanel(props: { panel: React.JSX.Element, routeContent: React.JSX.Element }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMediumOrAbove = useMediaQuery(theme.breakpoints.up("md"));

    function handleDrawerToggle() {
        setIsDrawerOpen(true)
    }

    function handleDrawerClose() {
        setIsDrawerOpen(false)
    }

    if (isMediumOrAbove) {
        return (
            <>
                <div style={{display: "flex", backgroundColor: drawerColor, width: '15em'}}>
                    <Divider orientation={"vertical"} flexItem/>
                    <div style={{
                        padding: '8px 8px 24px 8px',
                        position: 'sticky',
                        height: '100vh',
                        flex: 1,
                        top: 0,
                        overflowY: 'auto'
                    }}>
                        {props.panel}
                    </div>
                </div>
                <Fade in>
                    <Container style={{flexGrow: 1, marginTop: '24px'}}>
                        {props.routeContent}
                    </Container>
                </Fade>
            </>
        );
    } else {
        return <Fade in>
            <Container style={{flexGrow: 1, marginTop: '24px'}}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{mr: 2, display: {md: 'none'}}}
                >
                    <MenuIcon/>
                </IconButton>
                <RouteDrawer
                    open={isDrawerOpen}
                    onClose={handleDrawerClose}>
                    {props.panel}
                </RouteDrawer>
                {props.routeContent}
            </Container>
        </Fade>
    }
}