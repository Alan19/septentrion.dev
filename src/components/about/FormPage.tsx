import {Divider, Fade, Grid, Stack, Typography} from "@mui/material";
import {CharacterAttribute} from "./AboutPage";
import React from "react";
import {useNavigate} from "react-router-dom";
import {PageHeader} from "./PageHeader";
import {SkeletonImage} from "../SkeletonImage";

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
    description: string,
    imageAspectRatio: number
};

export function FormPage(props: {
    formInformation: FormInformation
}) {
    const navigate = useNavigate();
    const {name, body, affinity, weapons, height, history, image, imageAspectRatio} = props.formInformation;
    return <>
        <Fade in={true}>
            <div>
                <PageHeader title={name}/>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <Typography variant={"body1"}>{body}</Typography>
                        <Typography variant={"h5"} style={{marginTop: '8px'}}>History</Typography>
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
                        <SkeletonImage src={image} style={{width: '100%'}} aspectRatio={imageAspectRatio}/>
                    </Grid>
                </Grid>
            </div>
        </Fade>
    </>;
}