import {Divider, Grid, Stack, Typography} from "@mui/material";
import React from "react";
import {CharacterAttribute} from "./AlcorForms";

export function AquariusForm() {
    return <Grid container spacing={4}>
        <Grid item md={7}>
            <Typography variant={"h4"}>Aquarius Form</Typography>
            <Typography variant={"body1"}>
                A form highly suited for aquatic activity. Boasting extremely high speed in water along with
                high aural sensitivity, this form does well on combat both on shores and in water. Its shell
                daggers provides good close range defense on land, and allows for sonic booms in water. Its
                shark tail provides higher swim speed compared to a normal Samurott while it's buoyant tail orb
                allows for enhanced vertical speed in water, allowing for unusual aquatic maneuvers.
            </Typography>
            <Typography variant={"h5"}>History</Typography>
            <Typography>
                Alcor designed this form by combining the DNA of an Azumarill and Unovan Samurott, on top of
                adding
                some shark Pokemon DNA, explaining it's highly flexible amphibious parameters. He frequently
                used this form when participating in athletic activities during college such as swimming and
                sparring. The placement of the shell daggers make it impractical to wear long sleeved clothing,
                so Alcor refrains from using this form on land in colder climates. This is slightly remedied by
                Alcor's custom tailored wetsuit for this form, which allows for slightly higher temperature
                tolerance by being able to cover more of his body without interfering with his shell daggers.
            </Typography>
            <Divider style={{marginTop: "8px", marginBottom: "8px"}}/>
            <Stack direction={"column"} spacing={1}>
                <CharacterAttribute fieldName={"Height"} fieldValue={"5'6\""}/>
                <CharacterAttribute fieldName={"Weapons"} fieldValue={"Shell Daggers"}/>
                <CharacterAttribute fieldName={"Affinity"} fieldValue={"Water"}/>
            </Stack>
        </Grid>
        <Grid item md={5}>
            <img style={{width: "100%"}}
                 src={"https://alcorsiteartbucket.s3.amazonaws.com/aquarius_form_by_mixter.png"}/>
        </Grid>
    </Grid>;
}