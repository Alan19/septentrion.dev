import {Divider, Grid, Stack, Typography} from "@mui/material";
import React from "react";
import {CharacterAttribute} from "./AlcorForms";

export function AICoreForm() {
    return <Grid container spacing={4}>
        <Grid item md={7}>
            <Typography variant={"h4"}>AICore Form</Typography>
            <Typography variant={"body1"}>
                Alcor's form when combined with Castor. Its body is made of exotic matter, which infuses its
                flesh to create a fairly durable symbiote suit while still looking like skin. Faint particles
                gradually radiate off his body, creating a ghost-like effect, which is the basis for its short
                range teleportation ability. Its body also contains various tendrils composed of biomechanical
                mind-machine interfaces that allow him to interface and hack into machinery. These tendrils can
                be extended and retracted at will, but usually curl around his limbs by default. The form also
                sports a pair of clawed gauntlets that drastically enhances the force of its punches, while its
                claws can slice through light armor with ease. It also sports Castor's signature phantasmal
                butterfly wing augment, allowing for complex midair maneuvers.
            </Typography>
            <Typography variant={"h5"}>History</Typography>
            <Typography>
                Castor is a symbiote Alcor resurrected from a meteor he bought from an exotic market. Castor
                appears to be made out of a special form of matter that responds to imagination, causing changes
                in himself and it's host based on people they hang out with. However, he is looking into
                possible enhancements to this form to make it more battle ready instead. He is slightly nervous
                about using this form during the daytime, often opting to use it at night for parkour or
                patrolling. Castor's assistance allows Alcor to easily swap between all of his forms in the
                field and bypassing the need for immobile infrastructure.
            </Typography>
            <Divider style={{marginTop: "8px", marginBottom: "8px"}}/>
            <Stack direction={"column"} spacing={1}>
                <CharacterAttribute fieldName={"Height"} fieldValue={"6'6\""}/>
                <CharacterAttribute fieldName={"Weapons"} fieldValue={"Exotic Matter Clawed Gauntlet"}/>
                <CharacterAttribute fieldName={"Affinity"} fieldValue={"Light"}/>
            </Stack>
        </Grid>
        <Grid item md={5}>
            <img style={{width: "100%"}} src={"https://alcorsiteartbucket.s3.amazonaws.com/ai_core_raffle_sketch.jpg"}/>
        </Grid>

    </Grid>;
}