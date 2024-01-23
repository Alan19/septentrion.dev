import {Container, IconButton} from "@mui/material";
import React from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import {Home} from "@mui/icons-material";
import {LinksPage} from "./components/links/LinksPage";

export function SiteAppBar() {
    return <>
        <Container maxWidth={"xl"}>
            <Link to={'/'} style={{marginTop: '16px'}}>
                <IconButton>
                    <Home/>
                </IconButton>
            </Link>
            {
                useLocation().pathname === '/' && <LinksPage/>
            }
            <Outlet/>
        </Container>
    </>;
}