import React from "react";
import {Outlet, useLocation} from "react-router-dom";
import {NavigationRail} from "./components/navigation/NavigationRail";
import {LinksPage} from "./components/links/LinksPage";

export function Root() {
    return <NavigationRail>
        <div style={{display: 'flex'}}>
            {
                useLocation().pathname === '/' && <LinksPage/>
            }
            <Outlet/>
        </div>
    </NavigationRail>;
}