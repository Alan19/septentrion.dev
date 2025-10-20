import type {CSSProperties, ReactNode} from "react";

export function Container(props: { children: ReactNode[] | ReactNode, className?: string, style?: CSSProperties }) {
    // noinspection com.intellij.reactbuddy.ArrayToJSXMapInspection
    return <div className={"center large-padding " + props.className} style={{maxWidth: "1200px", ...props.style}}>
        {props.children}
    </div>;
}