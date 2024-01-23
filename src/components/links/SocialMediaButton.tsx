import React from "react";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsVariantOverrides} from "@mui/material/Button/Button";
import {IconButton} from "@mui/material";

interface SocialMediaProps {
    icon: React.ReactNode;
    text: string;
    variant?: OverridableStringUnion<'text' | 'outlined' | 'filled' | 'filledTonal' | 'elevated', ButtonPropsVariantOverrides>;
    link: string;
}

export function SocialMediaButton(props: SocialMediaProps) {
    const {icon, text, variant = "text", link} = props;

    return (
        <IconButton
            color={"primary"}
            target={"noreferrer noopener"}
            href={link}
        >
            {icon}
        </IconButton>
    );
}
