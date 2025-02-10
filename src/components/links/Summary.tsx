import {Grid} from "@mui/material";
import {SocialsLinks} from "./SocialsLinks";

import {Header} from "../Header";

export function Summary() {
    return <Grid container direction={"column"} spacing={3}>
        <Grid item>
            <Header/>
        </Grid>
        <Grid item>
            <Grid container>
                <Grid item xs={12} lg={7}>
                    <SocialsLinks/>
                </Grid>
            </Grid>
        </Grid>
    </Grid>;
}