import {Grid, useMediaQuery} from "@mui/material";
import {Summary} from "./Summary";
import {theme} from "../../App";
import React from "react";
import {M3Pane} from "../common/M3Pane";

export function LinksPage() {
    return <M3Pane>
        <Grid
            alignItems={"center"}
            container
            spacing={5}
            style={{minHeight: "calc(100vh - 40px)"}}
            direction={
                useMediaQuery(theme.breakpoints.up("sm")) ? "row" : "column-reverse"
            }
            justifyContent={"center"}
        >
            <Grid item sm={"auto"}>
                <Summary/>
            </Grid>
            <Grid item sm={3}>
                <img width={'100%'} src={'company-logo-colored.png'} alt={'a blue circular with a stylized bow pointing upward and a knife pointing leftward'}/>
            </Grid>
        </Grid>
    </M3Pane>
}