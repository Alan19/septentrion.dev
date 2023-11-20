import {Container, Divider, Grid, Stack, Typography, useMediaQuery} from "@mui/material";
import React from "react";
import {Link, Outlet} from "react-router-dom";
import './form-page.css'
import {theme} from "../../App";

export function CharacterAttribute(props: { fieldName: String, fieldValue: String }) {
    return <div>
        <Typography variant={"h6"}>{props.fieldName}</Typography>
        <Typography variant={"subtitle1"}>{props.fieldValue}</Typography>
    </div>;
}

export function AlcorForms() {
    const isMediumOrUp = useMediaQuery(theme.breakpoints.up('md'));
    const formInfo: {name: string, src: string, link: string}[] = [
        {
            name: "Aquarius Form",
            src: "https://alcorsiteartbucket.s3.amazonaws.com/aquarius_form_combar_outfit.png",
            link: "aquarius"
        },
        {
            name: "Jupiter Form",
            src: "https://alcorsiteartbucket.s3.amazonaws.com/future_spark.png",
            link: "jupiter"
        },
        {
            name:"AICore Form",
            src: "https://pbs.twimg.com/media/FcNTqa8aUAE4uED?format=jpg&name=4096x4096",
            link: "aicore"
        },
        {
            name: "M⬡ Form",
            src: "https://alcorsiteartbucket.s3.amazonaws.com/m_form_centered.png",
            link: "m"
        },
        {
            name: "Triangulum Form",
            src: "https://alcorsiteartbucket.s3.amazonaws.com/triangulum_form.jpg",
            link: "triangulum"
        }
    ]
    return (
        <Container style={{marginTop: '8px'}}>
            <Typography variant={"h3"} fontFamily={"Origin Tech"}>Alcor's Forms</Typography>
            <Grid container direction={"row"} spacing={1}>
                {
                    formInfo.map(value => <Grid item md={2}>
                        <Link to={value.link}>
                            <figure style={{margin: 0}}>
                                <img alt={value.name} className={'form-splash-image'} src={value.src}/>
                                <figcaption>{value.name}</figcaption>
                            </figure>
                        </Link>
                    </Grid>)
                }
                {/*    TODO Add link to gallery*/}
            </Grid>
            <Divider style={{marginBottom: '32px', marginTop: '32px'}}/>
            <Outlet/>
        </Container>
    );
}