import {Divider, Fade, Grid, Stack, Typography} from "@mui/material";
import {CharacterAttribute} from "./AboutPage";
import React from "react";
import {useNavigate} from "react-router-dom";
import {PageHeader} from "./PageHeader";

export type Affinity =
    'Fire'
    | 'Ice'
    | 'Electric'
    | 'Wind'
    | 'Water'
    | 'Stone'
    | 'Poison'
    | 'Burst'
    | 'Sound'
    | 'Light'
    | 'Darkness'
    | 'Gravity'
    | 'Kinesis'
    | 'Time';

export type FormInformation = {
    name: string,
    body: string,
    history?: string,
    height: string,
    weapons: string,
    affinity: string,
    thumbnail: string,
    image: string,
    link: string,
    description: string
};

export function FormPage(props: {
    formInformation: FormInformation
}) {
    const navigate = useNavigate();
    const {name, body, affinity, weapons, height, history, image} = props.formInformation;
    return <>
        <Fade in={true}>
            <div>
                <PageHeader title={name}/>
                <Grid container spacing={2}>
                    <Grid item md={6}>
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
                    <Grid item md>
                        <img style={{width: "100%"}} src={image}/>
                    </Grid>
                </Grid>
            </div>
        </Fade>
    </>;
}