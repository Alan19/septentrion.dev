import {clsx} from "clsx";
import {ModeToggle} from "./ModeToggle.tsx";
import _ from "lodash";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

function NavigationDestination(props: { value: { path: string; icon: string; label?: string }, isActive: boolean, className?: string }) {
    const {isActive, value} = props;
    const {icon, path, label} = value;
    return <Link className={props.className} to={`/${path}`}>
        <i className={clsx(isActive && "primary-container", "ripple")}>{icon}</i>
        <span className={clsx(isActive && "bold")}>{label ?? _.capitalize(path)}</span>
    </Link>;
}

export function NavigationRail() {
    const location = useLocation();
    const topLevelPath = (location.pathname.match(/^\/[^/]*/) ?? [''])[0];

    const links: { path: string, icon: string, label?: string }[] = [
        {
            path: "",
            icon: "home",
            label: "Home"
        },
        {
            path: "gallery",
            icon: "photo_album"
        },
        {
            path: "about",
            icon: "account_circle"
        },
        {
            path: "lore",
            icon: "book"
        },
        {
            path: "analytics",
            icon: "analytics"
        }
    ]
    return <nav className={clsx("m l left surface-container",)}>
        {
            links.map((value, index) => <NavigationDestination className={clsx(index === 0 && "top-margin")} value={value} isActive={topLevelPath === `/${value.path}`}/>)
        }
        <div className={"absolute bottom bottom-margin"} style={{display: "flex", gap: ".5rem", flexDirection: "column"}}>
            <ModeToggle/>
        </div>
    </nav>;
}