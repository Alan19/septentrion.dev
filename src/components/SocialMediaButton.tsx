import React from "react";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsVariantOverrides} from "@mui/material/Button/Button";
import {Button} from "@mui/material";

interface SocialMediaProps {
    icon: React.ReactNode;
    text: string;
    variant?: OverridableStringUnion<"text" | "outlined" | "contained",
        ButtonPropsVariantOverrides>;
    link: string;
}

export function SocialMediaButton(props: SocialMediaProps) {
    const {icon, text, variant = "contained", link} = props;
    let leftButton: any = {
        width: "100%",
        textAlign: "left",
    };

    return (
        <Button
            target={"noreferrer noopener"}
            href={link}
            startIcon={icon}
            variant={variant}
        >
            <span style={leftButton}>{text}</span>
        </Button>
    );
}
