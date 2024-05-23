import React, {useState} from "react";
import {Container, Fade, Grid, IconButton, useMediaQuery} from "@mui/material";
import {theme} from "../../App";
import {RouteDrawer} from "./RouteDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import {drawerColor} from "./NavigationRail";

export function RouteWithSubpanel(props: { panel: React.JSX.Element, routeContent: React.JSX.Element, panelCSS?: React.CSSProperties }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMediumOrAbove = useMediaQuery(theme.breakpoints.up("md"));
    const isSmallOrAbove = useMediaQuery(theme.breakpoints.up("sm"));

    function handleDrawerToggle() {
        setIsDrawerOpen(true)
    }

    function handleDrawerClose() {
        setIsDrawerOpen(false)
    }

    // TODO Figure out workaround for certain width causing rerendering due to scrollbar adjusting width
    if (isSmallOrAbove) {
        return (
            <>
                <Fade in>
                    <Container maxWidth={"xl"}>
                        <Grid container style={{padding: '16px 0px 0 0px'}} spacing={4} direction={isMediumOrAbove ? "row" : "column-reverse"}>
                            <Grid item md={9}>
                                <div style={{
                                    background: drawerColor,
                                    borderRadius: 24,
                                    padding: 16,
                                    marginBottom: 16,
                                    ...props.panelCSS
                                }}>
                                    {props.routeContent}
                                </div>
                            </Grid>
                            <Grid item md={3}>
                                <div style={{
                                    borderRadius: 24,
                                    background: drawerColor,
                                    position: 'sticky',
                                    maxHeight: isMediumOrAbove ? 'calc(100vh - 32px)' : 'inherit',
                                    flex: 1,
                                    top: 16,
                                    overflowY: 'auto',
                                    padding: 16
                                }}>
                                    {props.panel}
                                </div>
                            </Grid>
                        </Grid>
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