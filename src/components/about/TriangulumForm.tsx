import {Divider, Grid, Stack, Typography} from "@mui/material";
import React from "react";
import {CharacterAttribute} from "./AboutPage";

export function TriangulumForm() {
    return <Grid container spacing={4}>
        <Grid item md={7}>
            <Typography variant={"h4"}>Triangulum Form</Typography>
            <Typography variant={"body1"}>
                Alcor's form when his body fully completely absorbs the energy from Castor's exotic matter while
                siphoning energy from variations of him in alternate universes. It sports a more dragonic snout
                and horns, as well as bone and metal plating on its body. The energy wings have also changed
                into a slightly more dragonic shape. The exotic matter circulation has also been changed to be
                managed through his horns, causing its eyes to glow blue. Its physical strength and size is much
                higher in this form, due to this form's having higher parameters in managing exotic matter. This
                form specializes in short and mid range defense. It sports three tails, which are even further
                enhanced compared to his Gemini Form, with higher length and much sharper spikes that are designed
                to impale targets. Each tail also powers three drones each, which can fire lasers are distant
                targets to make it harder for them to approach. It also uses a pair of exotic matter clawed
                gauntlets to fight in close range.
            </Typography>
            <Typography variant={"h5"}>History</Typography>
            <Typography>
                Alcor developed this form out of a curiosity to discover the limits of his and Castor's
                potential. This form is often used when there is an emergency, which usually ends
                up with Alcor shredding his clothes as his body rapidly evolves into this form. The bone and
                metal plating are influenced by Midnight Lycanroc and various steel type Pokemon, which greatly
                increases his defense. Alcor has a much wilder personality in this form, and acts slightly
                uninhibited as a result. Alcor is greatly impressed by how it combines the power of both Gemini and
                AICore without having much drawbacks.
            </Typography>
            <Divider style={{marginTop: "8px", marginBottom: "8px"}}/>
            <Stack direction={"column"} spacing={1}>
                <CharacterAttribute fieldName={"Height"} fieldValue={"8'1\""}/>
                <CharacterAttribute fieldName={"Weapons"} fieldValue={"Exotic Energy Gauntlet, Triple Spiked Tails, and Laser Drones"}/>
                <CharacterAttribute fieldName={"Affinity"} fieldValue={"Light"}/>
            </Stack>
        </Grid>
        <Grid item md={5}>
            <img style={{width: "100%"}}
                 src={"https://alcorsiteartbucket.s3.amazonaws.com/triangulum_form.jpg"}/>
        </Grid>
    </Grid>;
}