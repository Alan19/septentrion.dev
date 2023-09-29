import {Grid, useMediaQuery} from "@mui/material";
import {Summary} from "./Summary";
import {CharacterImageGrid} from "./CharacterImageGrid";
import {theme} from "../App";

export function Main() {
    return <Grid
        alignItems={"center"}
        container
        spacing={5}
        style={{minHeight: "100vh"}}
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
    </Grid>;
}