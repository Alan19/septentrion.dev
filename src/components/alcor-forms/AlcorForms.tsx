import {Container, Typography} from "@mui/material";
import React from "react";
import {Outlet} from "react-router-dom";
import './form-page.css'
import {NavigationRail} from "../navigation/NavigationRail";
import {AlcorLoreDrawer} from "./AlcorLoreDrawer";

export function CharacterAttribute(props: { fieldName: String, fieldValue: String }) {
    return <div>
        <Typography variant={"h6"}>{props.fieldName}</Typography>
        <Typography variant={"subtitle1"}>{props.fieldValue}</Typography>
    </div>;
}

export function AlcorForms() {
    return (
        <NavigationRail secondPanel={<AlcorLoreDrawer/>}>
            <Container style={{paddingTop: '24px'}}>
                <Typography variant={"h3"} style={{marginBottom: '8px'}} color={'var(--md-sys-color-primary)'} fontFamily={"Origin Tech"}>Alcor's Forms</Typography>
                <Outlet/>
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