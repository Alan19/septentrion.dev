import {Box} from "@mui/material";

export function ColorSquare(props: Readonly<{ color: string, shape: 'square' | 'circle' }>) {
    // TODO Re-add toast when copying, fix this
    return <>
        <Box boxShadow={1} className={'color-square'} style={{borderRadius: props.shape === 'circle' ? '50%' : '25%', aspectRatio: 1, height: 50, backgroundColor: props.color}}/>
    </>;
}