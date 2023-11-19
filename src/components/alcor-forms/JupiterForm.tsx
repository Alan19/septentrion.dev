import {Divider, Grid, Stack, Typography} from "@mui/material";
import React from "react";
import {CharacterAttribute} from "./AlcorForms";

export function JupiterForm() {
    return <Grid container spacing={4}>
        <Grid item md={7}>
            <Typography variant={"h4"}>Jupiter Form</Typography>
            <Typography variant={"body1"}>
                A form custom built for devastating electricity attacks. This form can store large amounts of
                electricity using its yellow natural armor and the blue areas on his fur. The black markings on
                his natural armor light up at full charge. It has extremely high strength and durability through
                the combination of a Zinogre's large body mass and armored plating, and combined with a slightly
                modified tail, it is able to execute deadly combos of attacks.
            </Typography>
            <Typography variant={"h5"}>History</Typography>
            <Typography>
                Alcor designed this form by combining the DNA of a Zinogre and Zeraora, combined with his own
                DNA, something only made possible through the use of recently discovered mutagenic
                intelligent subatomic particles. Alcor equipped this form with light
                berserker armor, as well as energy claws and a double edged spear, both of which are charged
                with electricity. By default, attempting to integrate Zinogre traits into a body requires tricky
                balancing of natural armor, ease of use, and flexibility, but by integrating Zeraora
                traits, Alcor was able to optimize all 3 parameters to a state that he was comfortable with.
            </Typography>
            <Divider style={{marginTop: "8px", marginBottom: "8px"}}/>
            <Stack direction={"column"} spacing={1}>
                <CharacterAttribute fieldName={"Height"} fieldValue={"8'1\""}/>
                <CharacterAttribute fieldName={"Weapons"}
                                    fieldValue={"Energy Claws and Double Edged Hardlight Partizan"}/>
                <CharacterAttribute fieldName={"Affinity"} fieldValue={"Electric"}/>
            </Stack>
        </Grid>
        <Grid item md={5}>
            <img style={{width: "100%"}} src={"https://alcorsiteartbucket.s3.amazonaws.com/jupiter_form.png"}/>
        </Grid>
    </Grid>;
}