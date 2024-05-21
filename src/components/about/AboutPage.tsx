import {Snackbar, Typography} from "@mui/material";
import React, {createContext, memo, useEffect} from "react";
import {Outlet} from "react-router-dom";
import './form-page.css'
import {AboutPageNavigation} from "./AboutPageNavigation";
import {RouteWithSubpanel} from "../navigation/RouteWithSubpanel";

// @ts-ignore
export const CopyColorContext: React.Context<[string, (color: string) => void]> = createContext(undefined)

export function CharacterAttribute(props: { fieldName: string, fieldValue: string }) {
    return <div>
        <Typography variant={"h6"}>{props.fieldName}</Typography>
        <Typography variant={"subtitle1"}>{props.fieldValue}</Typography>
    </div>;
}

export const AboutPage = memo(function AboutPage() {
    const [copiedColor, setCopiedColor] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClick = (color: string) => {
        setCopiedColor(color);
    };

    useEffect(() => {
        if (copiedColor !== "") {
            setIsOpen(true);
        }
    }, [copiedColor]);

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setIsOpen(false);
    };
    return (
        <>
            <CopyColorContext.Provider value={[copiedColor, handleClick]}>
                <RouteWithSubpanel panel={<AboutPageNavigation/>} routeContent={<Outlet/>}/>
                <Snackbar
                    open={isOpen}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={`Copied ${copiedColor} to clipboard`}
                />
            </CopyColorContext.Provider>
        </>
    );
});