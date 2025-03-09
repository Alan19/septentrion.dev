import React, {useState} from "react";
import {Container, Fade, Grid, IconButton, useMediaQuery} from "@mui/material";
import {RouteDrawer} from "./RouteDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import {M3Pane} from "./M3Pane";
import {materialDesign2Theme} from "../../MaterialDesign2Theme.tsx";

export function RouteWithSubpanel(props: { panel: React.JSX.Element, routeContent: React.JSX.Element, panelCSS?: React.CSSProperties }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMediumOrAbove = useMediaQuery(materialDesign2Theme.breakpoints.up("md"));
    const isSmallOrAbove = useMediaQuery(materialDesign2Theme.breakpoints.up("sm"));

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
                    <Grid container spacing={2} direction={isMediumOrAbove ? "row" : "column-reverse"}>
                        <Grid item md={9}>
                            <M3Pane lastElement={false}>
                                {props.routeContent}
                            </M3Pane>
                        </Grid>
                        <Grid item md={3}>
                            <M3Pane>
                                {props.panel}
                            </M3Pane>
                        </Grid>
                    </Grid>
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