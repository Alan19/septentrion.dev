import {Grid, useMediaQuery} from "@mui/material";
import {Summary} from "./Summary";

import {M3Pane} from "../common/M3Pane";
import {materialDesign2Theme} from "../../MaterialDesign2Theme.tsx";
import {useDocumentTitle} from "usehooks-ts";

export function LinksPage() {
    useDocumentTitle("septentrion.dev");

    function colorImage(color: string) {
        return {filter: `drop-shadow(0px 1000px 0 ${color}`, transform: 'translateY(-1000px)'}
    }

    return <M3Pane>
        <Grid
            alignItems={"center"}
            container
            spacing={5}
            style={{minHeight: "calc(100vh - 40px)"}}
            direction={
                useMediaQuery(materialDesign2Theme.breakpoints.up("sm")) ? "row" : "column-reverse"
            }
            justifyContent={"center"}
        >
            <Grid item sm={"auto"}>
                <Summary/>
            </Grid>
            <Grid item sm={3}>
                <img width={'100%'} src={'company-logo-colored.png'} style={colorImage("var(--md-sys-color-primary)")} alt={'a blue circular with a stylized bow pointing upward and a knife pointing leftward'}/>
            </Grid>
        </Grid>
    </M3Pane>
}