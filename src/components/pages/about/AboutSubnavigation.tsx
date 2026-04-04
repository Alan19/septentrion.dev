import {useLocation} from "react-router";
import {clsx} from "clsx";
import {Link} from "react-router-dom";
import {useIsMobile} from "../../../hooks/useIsMobile.ts";
import {aboutSubRoutes} from "../../../AppRouter.tsx";

export function AboutSubnavigation() {
    const location = useLocation();
    const currentSubroute = (new RegExp(/^\/about(.*)/).exec(location.pathname) ?? ['/about', ''])[1];
    const isMobile = useIsMobile();

    let linkButtons = <ul className="list border small-padding">
        <Link style={{display: "contents"}} to={`/about/`} className={"left-padding center-align no-margin"}>
            <button className={clsx("transparent left-align large", currentSubroute === `/` ? "fill" : "small-opacity")}>
                Overview
            </button>
        </Link>
        {aboutSubRoutes.map(value => <Link style={{display: "contents"}} key={value.name} to={`/about/${value.path}`} className={"left-padding center-align no-margin"}>
            <button className={clsx("transparent left-align large", (currentSubroute === `/${value.path}`) ? "fill" : "small-opacity")}>
                {value.name}
            </button>
        </Link>)}
    </ul>;

    const togglePopover = () => {
        let dialog: HTMLElement = document.querySelector('#dialog');
        dialog.togglePopover();
    };

    return isMobile ? <div className={"top-margin left-margin"}>
        <button onClick={() => togglePopover()} className={"transparent circle"}><i>menu</i></button>
        <dialog className="left" id={"dialog"} popover={""}>
            <button className={"transparent circle"} onClick={() => togglePopover()} style={{margin: 8}}><i>menu_open</i></button>
            {linkButtons}
        </dialog>
    </div> : <div className={"surface-container-high slide-right"} style={{height: "100%", borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeft: "solid 1px var(--surface-variant)", width: '240px'}}>
        {linkButtons}
    </div>;
}