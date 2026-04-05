import {useLocation} from "react-router";
import {clsx} from "clsx";
import {Link} from "react-router-dom";
import {useIsMobile} from "../../../hooks/useIsMobile.ts";
import {aboutSubRoutes} from "../../../AppRouter.tsx";

function LinkButton(props: Readonly<{ path: string, name: string, isActive: boolean }>) {
    return <Link style={{display: "contents"}} to={`${props.path}`} className={"left-padding center-align no-margin"}>
        <button className={clsx("transparent left-align large", props.isActive ? "fill" : "large-opacity")}>
            {props.name}
        </button>
    </Link>;
}

export function AboutSubnavigation() {
    const location = useLocation();
    const currentSubroute = (new RegExp(/^\/about\/?(.*)/).exec(location.pathname) ?? ['/about', ''])[1];
    const isMobile = useIsMobile();

    let linkButtons = <ul className="list border small-padding">
        {[{path: '', name: 'Me IRL'}].concat(aboutSubRoutes).map(value => <LinkButton key={value.name} name={value.name} path={value.path} isActive={currentSubroute === value.path}/>)}
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