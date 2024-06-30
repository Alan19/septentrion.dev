import {PageHeader} from "../PageHeader";
import {Fade, Grid, Typography} from "@mui/material";
import {SkeletonImage} from "../../SkeletonImage";
import React from "react";

export function SomaInfo() {
    return (
        <Fade in>
            <Grid container spacing={2}>
                <Grid item>
                    <PageHeader title={'Soma'}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'h5'}>Synopsis</Typography>
                </Grid>
                <Grid item md>
                    <Typography>
                        Soma is a character for a custom tabletop system I am currently playing in. The tabletop ruleset is class-less, but his playstyle is most similar to a bard. At a young age, an accident caused his brain to 'upgraded'
                        to an artificial brain constructed from exotic materials from another world. Because of his brain replacement, his parents moved him from a traditional fantasy city to a space age rural civilization, where they are
                        more equipped to handle his new condition if necessary.
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <SkeletonImage style={{width: '100%'}} src={'https://pbs.twimg.com/media/GNK9yJPXwAE-6dG?format=jpg&name=medium'} aspectRatio={1}/>
                </Grid>
            </Grid>
        </Fade>

    );
}