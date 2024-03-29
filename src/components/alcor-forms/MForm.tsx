import {Divider, Grid, Stack, Typography} from "@mui/material";
import React from "react";
import {CharacterAttribute} from "./AlcorForms";
import {Link} from "react-router-dom";

export function MForm() {
    return <Grid container spacing={4}>
        <Grid item md={7}>
            <Typography variant={"h4"}>Gemini Form</Typography>
            <Typography variant={"body1"}>
                Alcor's form when his body absorbs Castor's exotic matter using an alternate procedure. It does
                not take on Castor's standard colors, but its eyes show signs of Castor's influence. While it
                does not have any of AICore's special features besides its energy wings, it does enhance Alcor's
                physical prowess to the next level, effectively functioning as his first evolved form. This form
                features a much stronger tail with two rows of spikes with much higher spike density, along with
                a muscle system that is optimized for physical strength without losing dexterity. Exotic matter
                constantly pulses through its stripes, replenishing its body with energy.
            </Typography>
            <Typography variant={"h5"}>History</Typography>
            <Typography>
                Alcor discovered this form when he wanted to use all of his enhanced strength that is only
                accessible when he is merged with Castor, but without turning into a form unrecognized by the
                public. By having Castor slowly infuse his cells from the inside of his body, he can effectively
                stay recognizable while showing off the changes to his body. He also is impressed by the
                enhanced tail, hair, and horns on his body, giving him a more confident demeanor when he's in
                this form. As a result, Alcor usually wears a tank top and shorts in this form, allowing him to
                show off his enhanced body better. He often uses this form when he needs to do anything that
                requires extra strength or endurance, or when showing off.
            </Typography>
            <Divider style={{marginTop: "8px", marginBottom: "8px"}}/>
            <Stack direction={"column"} spacing={1}>
                <CharacterAttribute fieldName={"Height"} fieldValue={"6'6\""}/>
                <CharacterAttribute fieldName={"Weapons"} fieldValue={"Bare Fists and Spiked Tail"}/>
                <CharacterAttribute fieldName={"Affinity"} fieldValue={"Light"}/>
            </Stack>
        </Grid>
        <Grid item md={5}>
            <img style={{width: "100%"}} src={"https://alcorsiteartbucket.s3.amazonaws.com/m6_form.jpg"}/>
            <Link to={"/gallery?Gemini+Form=1"}>Click here to see more art!</Link>
        </Grid>
    </Grid>;
}