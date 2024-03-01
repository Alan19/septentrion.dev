import {Container, Fade, Grid, useMediaQuery} from "@mui/material";
import {Summary} from "./Summary";
import {CharacterImageGrid} from "./CharacterImageGrid";
import {theme} from "../../App";
import React from "react";
import {NavigationRail} from "../gallery/NavigationRail";

export function LinksPage() {
    return <NavigationRail>
        <Fade in={true}>
            <Container maxWidth={"xl"}>
                <Grid
                    alignItems={"center"}
                    container
                    spacing={5}
                    style={{minHeight: "calc(100vh)"}}
                    direction={
                        useMediaQuery(theme.breakpoints.up("sm")) ? "row" : "column-reverse"
                    }
                    justifyContent={"center"}
                >
                    <Grid item sm={"auto"}>
                        <Summary/>
                    </Grid>
                    <Grid item sm>
                        <CharacterImageGrid/>
                    </Grid>
                </Grid>
            </Container>
        </Fade>
    </NavigationRail>;
}