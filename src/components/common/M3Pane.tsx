import React from "react";
import {useMediaQuery} from "@mui/material";
import {theme} from "../../App";

export function M3Pane(props: { children: React.JSX.Element, lastElement?: boolean, style?: React.CSSProperties }) {
    const {children, lastElement = true, style} = props;
    const isMediumOrAbove = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <div className={'fade'}
             style={{borderRadius: 28, ...(isMediumOrAbove && {backgroundColor: `var(--md-sys-color-surface)`}), marginTop: 16, marginBottom: 16, padding: 24, ...(lastElement && isMediumOrAbove && {marginRight: '1rem'}), ...(style)}}>
            {children}
        </div>
    );
}