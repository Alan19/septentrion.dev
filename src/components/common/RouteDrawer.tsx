import {Drawer} from "@mui/material";
import React, {ReactEventHandler} from "react";
import {drawerColor} from "./Navigation";

/**
 * Drawer component for subpanels on mobile pages
 * @param props
 * @constructor
 */
export function RouteDrawer(props: {
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
            padding: 16,
            flexDirection: 'column',
            backgroundColor: drawerColor,
        }}>
            {props.children}
        </div>
    </Drawer>
}