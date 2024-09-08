import React from "react";
import {Outlet, useLocation} from "react-router-dom";
import {Navigation} from "./components/common/Navigation";
import {LinksPage} from "./components/links/LinksPage";

export function Root() {
    return <Navigation>
        <div style={{display: 'flex'}}>
            {
                useLocation().pathname === '/' && <LinksPage/>
            }
            <Outlet/>
        </div>
    </Navigation>;
}