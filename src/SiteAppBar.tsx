import React from "react";
import {Outlet, useLocation} from "react-router-dom";
import {LinksPage} from "./components/links/LinksPage";

export function SiteAppBar() {
    // TODO Clean up routes now that I have HOCs
    return <>
        {
            useLocation().pathname === '/' && <LinksPage/>
        }
        <Outlet/>
    </>;
}