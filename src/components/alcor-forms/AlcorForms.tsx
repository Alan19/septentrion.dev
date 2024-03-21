import {Card, CardContent, CardMedia, Container, Fade, Grid, Typography} from "@mui/material";
import React from "react";
import {Link, useLocation} from "react-router-dom";
import './form-page.css'
import alcorForms from "./form-icons/alcor_forms.json"
import {NavigationRail} from "../gallery/NavigationRail";

export function CharacterAttribute(props: { fieldName: String, fieldValue: String }) {
    return <div>
        <Typography variant={"h6"}>{props.fieldName}</Typography>
        <Typography variant={"subtitle1"}>{props.fieldValue}</Typography>
    </div>;
}

export function AlcorForms() {
    const formInfo: FormInformation[] = alcorForms;

    const selectedForm: string | null = useLocation().pathname.split('/')[2]
    return (
        <NavigationRail>
            <Container style={{paddingTop: '24px'}}>
                <Typography variant={"h3"} color={'var(--md-sys-color-primary)'} fontFamily={"Origin Tech"}>Alcor's Forms</Typography>
                <Fade in>
                    <div style={{marginTop: "16px"}}>
                        <Grid container direction={"row"} spacing={2}>
                            {
                                formInfo.map(value =>
                                    <Grid item md={2} xs={6}>
                                        <Link to={value.link}>
                                            <Card>
                                                <CardMedia image={value.image} sx={{height: "250px"}}/>
                                                <CardContent>
                                                    <Typography variant={"h5"}>{value.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {value.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </Grid>)
                            }
                            {/*    TODO Add link to gallery*/}
                        </Grid>
                        {
                            selectedForm === "" &&
                            <Typography style={{fontStyle: "italic"}}>Click on an icon to read information about this
                                form!</Typography>
                        }
                    </div>
                </Fade>
            </Container>
        </NavigationRail>
    );
}

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