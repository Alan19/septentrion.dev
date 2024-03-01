import {Drawer} from "@mui/material";
import {materialYouTheme} from "../../App";
import React, {ReactEventHandler} from "react";

export function FilterDrawer(props: {
    children: React.JSX.Element, open?: boolean,
    onClose: ReactEventHandler<{}>
}) {
    return <Drawer
        sx={{
            width: 300,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
                width: 300,
                boxSizing: "border-box",
            },
            minHeight: 'revert'
        }}
        onClose={props.onClose}
        open={props.open}
        variant={"temporary"}>
        <div style={{
            display: "flex",
            padding: '24px 16px 16px',
            flexDirection: 'column',
            backgroundColor: materialYouTheme.sys.color.surfaceContainerHigh
        }}>
            {props.children}
        </div>
    </Drawer>
}