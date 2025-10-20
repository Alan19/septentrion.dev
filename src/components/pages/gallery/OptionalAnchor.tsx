import _ from "lodash";
import type {ReactNode} from "react";

export function OptionalAnchor(props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {children: ReactNode}) {
    if (props.href) {
        return <a {..._.omit(props, ["children"])}>{props.children}</a>;
    }
    else {
        return props.children
    }
}