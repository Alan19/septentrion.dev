import {AppBar, Container, IconButton, Toolbar, Typography} from "@mui/material";
import React from "react";

function SiteAppBar() {
    return <AppBar style={{position: "static"}}>
        <Container maxWidth={"xl"}>
            <Toolbar disableGutters>
                <a href={'/'}>
                    <img src={process.env.PUBLIC_URL + "/favicon.ico"} style={{height: "60px"}}/>
                </a>
                <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: "none", md: "flex"},
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Alcor's Site
                    </Typography>
            </Toolbar>
        </Container>
    </AppBar>;
}