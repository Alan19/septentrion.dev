import {Typography} from "@mui/material";
import React, {memo} from "react";

export const PageHeader = memo(function PageHeader(props: { title: string }) {
    return <Typography variant={"h3"} fontFamily={"Potra"} color={"var(--md-sys-color-primary)"}>{props.title}</Typography>;
});