import React, {useContext} from "react";
import {Box} from "@mui/material";
import Clipboard from 'react-clipboard.js';
import {CopyColorContext} from "./AboutPage";

export function ColorSquare(props: { color: string, shape: 'square' | 'circle' }) {
    const [copiedColor, setCopiedColor] = useContext(CopyColorContext);
    return <>
        <Clipboard onClick={() => setCopiedColor(props.color)} component={"div"} data-clipboard-text={props.color}>
            <Box boxShadow={1} className={'color-square'} style={{borderRadius: props.shape === 'circle' ? '50%' : '25%', aspectRatio: 1, height: 50, backgroundColor: props.color}}/>
        </Clipboard>
    </>;
}