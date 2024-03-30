import {Divider, Fade, Grid, Stack, Typography} from "@mui/material";
import {CharacterAttribute, FormInformation} from "./AlcorForms";
import React from "react";
import {useNavigate} from "react-router-dom";

export function FormPage(props: {
    formInformation: FormInformation
}) {
    const navigate = useNavigate();
    const {name, body, affinity, weapons, height, history, image} = props.formInformation;
    return <>
        <Fade in={true}>
            <Grid container spacing={4}>
                <Grid item md={7}>
                    <Typography variant={"h4"}>{name}</Typography>
                    <Typography variant={"body1"}>{body}</Typography>
                    <Typography variant={"h5"}>History</Typography>
                    <Typography>
                        {history}
                    </Typography>
                    <Divider style={{marginTop: "8px", marginBottom: "8px"}}/>
                    <Stack direction={"column"} spacing={1}>
                        <CharacterAttribute fieldName={"Height"} fieldValue={height}/>
                        <CharacterAttribute fieldName={"Weapons"} fieldValue={weapons}/>
                        <CharacterAttribute fieldName={"Affinity"} fieldValue={affinity}/>
                    </Stack>
                </Grid>
                <Grid item md={5}>
                    <img style={{width: "100%"}} src={image}/>
                </Grid>
            </Grid>
        </Fade>
    </>;
}