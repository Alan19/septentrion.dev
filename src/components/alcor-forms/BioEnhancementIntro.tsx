import {Fade, Grid, Typography, useMediaQuery} from "@mui/material";
import React from "react";
import {getPageHeader} from "./AboutPage";
import aquariusSplashArt from "./form-icons/aquarius-splash-art.png"
import eclipseDeity from "./form-icons/eclipse-deity-transparent.webp"

export function BioEnhancementIntro() {
    const isPortrait = useMediaQuery('(orientation: portrait)');
    return <Fade in>
        <div>
            {getPageHeader("Bio-Enhancement")}
            <Grid container direction={"row"} spacing={2}>
                <Grid item>
                    <Typography variant={"body1"}>
                        Due to the conflicts that embroil [REDACTED] City, Alcor has a hidden bio-enhancement room in his laboratory where he experiments on himself to push himself to evolve into stronger or more versatile forms. While
                        Alcor cannot shapeshift naturally, he is able to infuse himself with Castor's exotic matter to tap into alternate realities and synthesize powerful vessels for him to upload his consciousness into, or to evolve
                        himself into a stronger form.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"h5"}>Interdimensional Bio-Synthesis</Typography>
                </Grid>
                <Grid item sm={3}>
                    <img style={{width: '100%'}} src={aquariusSplashArt}/>
                </Grid>
                <Grid item sm>
                    <Typography variant={"body1"}>
                        The vessels are inspired by alternate universes where Alcor is of a different species. Since they're not sentient, Alcor can upload his mind into those bodies. Resting in the exotic matter-infused body tank in this
                        room
                        seems to synchronize his memories with his other selves, and occasionally causes lucid dreams where he can interact with some of his alternate forms in a shared mental space. The bio-enhancement lab also contains a
                        small
                        training space where he can practice using each of his other bodies' fighting styles.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"h5"}>Evolutionary Infusions</Typography>
                </Grid>
                <Grid item sm={3}>
                    <img width={'100%'} src={eclipseDeity}/>

                </Grid>
                <Grid item sm>
                    <Typography>
                        While Alcor normally appears as a fairly well built and toned cougar-dragon hybrid, he used to be a bit smaller before creating Castor. Alcor first gained the ability to evolve into a stronger form after fusing with
                        Castor for the first time (although all his friends noted he could have just worked out a bit more), which resulted in him being infused with his first dose of exotic matter. This resulted in further experiments to
                        synthesize larger doses of exotic matter for Alcor to absorb, which was a wild success. This caused Alcor to evolve even further, although each of those forms do have tradeoffs, and needs a lot of energy to maintain,
                        so
                        Alcor can't use them all the time. Eager to transcend these limitations, Alcor sought to infuse fragments of dormant gods into the exotic matter infusion. While this approach temporarily circumvented his evolutionary
                        plateau, the resulting transformations were difficult to effectively use.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    </Fade>;
}