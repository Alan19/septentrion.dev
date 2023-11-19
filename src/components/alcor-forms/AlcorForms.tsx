import {Container, Divider, Stack, Typography} from "@mui/material";
import React from "react";
import {Link, Outlet} from "react-router-dom";

export function CharacterAttribute(props: { fieldName: String, fieldValue: String }) {
    return <div>
        <Typography variant={"h6"}>{props.fieldName}</Typography>
        <Typography variant={"subtitle1"}>{props.fieldValue}</Typography>
    </div>;
}

export function AlcorForms() {
    return (
        <Container style={{marginTop: '8px'}}>
            <Typography variant={"h3"} fontFamily={"Origin Tech"}>Alcor's Forms</Typography>
            {/*<AquariusForm/>*/}
            {/*<Divider style={{marginTop: '8px', marginBottom: '8px'}}/>*/}
            {/*<JupiterForm/>*/}
            {/*<Divider style={{marginTop: '8px', marginBottom: '8px'}}/>*/}
            {/*<AICoreForm/>*/}
            {/*<Divider style={{marginTop: '8px', marginBottom: '8px'}}/>*/}
            {/*<MForm/>*/}
            {/*<Divider style={{marginTop: '8px', marginBottom: '8px'}}/>*/}
            {/*<TriangulumForm/>*/}
            <Stack direction={"row"} spacing={1}>
                <Link to={"aquarius"}>Aquarius Form</Link>
                <Link to={"jupiter"}>Jupiter Form</Link>
                <Link to={"aicore"}>AICore Form</Link>
                <Link to={"m"}>M Form</Link>
                <Link to={"triangulum"}>Triangulum Form</Link>
            {/*    TODO Add link to gallery*/}
            </Stack>
            <Divider style={{marginBottom: '32px'}}/>
            <Outlet />
        </Container>
    );
}