import {useMediaQuery} from "@mui/material";

import {materialDesign2Theme} from "../../MaterialDesign2Theme.tsx";

export function M3Pane(props: Readonly<{ children: React.JSX.Element | React.JSX.Element[], lastElement?: boolean, style?: React.CSSProperties }>) {
    const {children, lastElement = true, style} = props;
    const isMediumOrAbove = useMediaQuery(materialDesign2Theme.breakpoints.up("md"));

    // noinspection com.intellij.reactbuddy.ArrayToJSXMapInspection
    return (
        <div className={'fade'}
             style={{borderRadius: 28, ...(isMediumOrAbove && {backgroundColor: `var(--md-sys-color-surface)`}), marginTop: 16, marginBottom: 16, padding: 24, ...(lastElement && isMediumOrAbove && {marginRight: '1rem'}), ...(style)}}>
            {children}
        </div>
    );
}