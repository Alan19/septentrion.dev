import {useDocumentTitle} from "usehooks-ts";
import {AboutSubnavigation} from "./AboutSubnavigation.tsx";
import {Outlet} from "react-router";
import {useIsMobile} from "../../../hooks/useIsMobile.ts";
import './about.css'
export function AboutRoot() {
    useDocumentTitle("About Me - septentrion.dev");
    const isMobile = useIsMobile();
    return <div style={{display: !isMobile && "flex", height: "100%"}}>
        <AboutSubnavigation/>
        <div style={{width: '100%'}}>
            <Outlet/>
        </div>
    </div>;
}