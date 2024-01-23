import React from "react";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsVariantOverrides} from "@mui/material/Button/Button";
import {Button} from "@mui/material-next";
import {Link} from "react-router-dom";

interface SocialMediaProps {
    icon: React.ReactNode;
    text: string;
    variant?: OverridableStringUnion<'text' | 'outlined' | 'filled' | 'filledTonal' | 'elevated', ButtonPropsVariantOverrides>;
    link: string;
}

export default function InternalLinkButton(props: SocialMediaProps) {
    const {icon, text, variant = "contained", link} = props;
    let leftButton: any = {
        width: "100%",
        textAlign: "left",
    };

    return (
        <Link to={link}>
            <Button startIcon={icon} fullWidth variant={"filled"}>
                <span style={leftButton}>{text}</span>
            </Button>
        </Link>
    );
}
