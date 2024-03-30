import {Container, Fade, Grid, useMediaQuery} from "@mui/material";
import {Summary} from "./Summary";
import {theme} from "../../App";
import React from "react";
import {NavigationRail} from "../navigation/NavigationRail";

export function LinksPage() {
    return <NavigationRail>
        <Fade in={true}>
            <Container>
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
                        <img width={'100%'} src={'company-logo-colored.png'} alt={'a blue circular with a stylized bow pointing upward and a knife pointing leftward'}/>
                    </Grid>
                </Grid>
            </Container>
        </Fade>
    </NavigationRail>;
}