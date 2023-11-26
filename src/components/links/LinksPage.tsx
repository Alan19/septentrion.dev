import {Fade, Grid, useMediaQuery} from "@mui/material";
import {Summary} from "./Summary";
import {CharacterImageGrid} from "./CharacterImageGrid";
import {theme} from "../../App";
import React from "react";

export function LinksPage() {
    return <Fade in={true}>
        <Grid
        alignItems={"center"}
        container
        spacing={5}
        style={{minHeight: "calc(100vh - 128px)"}}
        direction={
            useMediaQuery(theme.breakpoints.up("sm")) ? "row" : "column-reverse"
        }
        justifyContent={"center"}
    >
        <Grid item lg={"auto"} md={"auto"} sm={5}>
            <Summary/>
        </Grid>
        <Grid item lg md sm>
            <CharacterImageGrid/>
        </Grid>
        </Grid>
    </Fade>;
}