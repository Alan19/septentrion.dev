import {Avatar, Grid, Stack, Typography, useMediaQuery} from "@mui/material";
import React from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import './form-page.css'
import {theme} from "../../App";
import aquariusIcon from "./form-icons/aquarius-icon.png"
import aicoreIcon from "./form-icons/aicore-icon.png"
import triangulumIcon from "./form-icons/triangulum-icon.png"
import jupiterIcon from "./form-icons/jupiter-icon.png"
import mIcon from "./form-icons/m-icon.png"

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
            src: aquariusIcon,
            link: "aquarius"
        },
        {
            name: "Jupiter Form",
            src: jupiterIcon,
            link: "jupiter"
        },
        {
            name:"AICore Form",
            src: aicoreIcon,
            link: "aicore"
        },
        {
            name: "M⬡ Form",
            src: mIcon,
            link: "m"
        },
        {
            name: "Triangulum Form",
            src: triangulumIcon,
            link: "triangulum"
        }
    ]

    const selectedForm: string | null = useLocation().pathname.split('/')[2]
    return (
        <>
                <Typography variant={"h3"} fontFamily={"Origin Tech"}>Alcor's Forms</Typography>
            <Grid container spacing={1} style={{marginTop: "16px"}}>
                <Grid item lg={1}>
                    <Stack direction={isMediumOrUp ? "column" : "row"} spacing={2}>
                        {
                            formInfo.map(value => <Grid item md={2}>
                                <Link to={value.link}>
                                    <Avatar alt={value.name}
                                            variant={selectedForm === value.link ? "rounded" : "circular"}
                                            src={value.src} sx={{width: 80, height: 80}}/>
                                </Link>
                            </Grid>)
                        }
                        {/*    TODO Add link to gallery*/}
                    </Stack>
                </Grid>
                <Grid item lg={11}>
                    <Outlet/>
                </Grid>
            </Grid>
        </>
    );
}