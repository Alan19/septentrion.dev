import React from "react";
import {Box} from "@mui/material";
import Clipboard from 'react-clipboard.js';

export function ColorSquare(props: { color: string, shape: 'square' | 'circle' }) {
    // TODO Re-add toast when copying
    return <>
        <Clipboard component={"div"} data-clipboard-text={props.color}>
            <Box boxShadow={1} className={'color-square'} style={{borderRadius: props.shape === 'circle' ? '50%' : '25%', aspectRatio: 1, height: 50, backgroundColor: props.color}}/>
        </Clipboard>
    </>;
}