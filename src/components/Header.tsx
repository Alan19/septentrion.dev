import {Typography} from "@mui/material";
import React from "react";

export function Header() {
    return (
        <>
            <Typography fontFamily={"Origin Tech"} color={'var(--md-sys-color-primary)'} variant={"h2"}>
                Alcor
            </Typography>
            <Typography variant={"subtitle1"} color={'var(--md-sys-color-secondary)'}>
                Cougar-dragon doing his best! ✨
            </Typography>
            <Typography variant={"subtitle2"}>
                He/him ◈ Software Engineer 👨‍💻 ◈ TTRPG Enthusiast 🎲 ◈ Casual CFVG Player 🎴
            </Typography>
        </>
    );
}