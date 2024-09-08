import {Divider, Fade, Grid, Stack, Typography} from "@mui/material";
import {CharacterAttribute} from "../world/AboutPage";
import React from "react";
import {useParams} from "react-router-dom";
import {PageHeader} from "../PageHeader";
import {SkeletonImage} from "../../SkeletonImage";
import {alcorForms, superheroSuits} from "./alcorForms";

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

export function FormPage() {
    const formName = encodeURIComponent(useParams().character ?? "");
    const formObject = alcorForms.concat(superheroSuits).find(value => value.link === formName);
    if (formObject) {
        const {name, body, affinity, weapons, height, history, image, imageAspectRatio} = formObject;
        return <>
            <Fade in={true}>
                <div>
                    <PageHeader title={name}/>
                    <Grid container spacing={'1rem'}>
                        <Grid item md>
                            <SkeletonImage src={image} style={{width: '100%'}} aspectRatio={imageAspectRatio}/>
                        </Grid>
                        <Grid item md={6}>
                            <Typography variant={"h5"}>Overview</Typography>
                            <Typography variant={"body1"}>{body}</Typography>
                        </Grid>
                        <Grid item md={12}>
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
                    </Grid>
                </div>
            </Fade>
        </>
    } else {
        // TODO Add error boundary
        return <></>
    }
}