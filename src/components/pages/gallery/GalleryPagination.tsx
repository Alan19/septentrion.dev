import {clsx} from "clsx";
import React from "react";

export function GalleryPagination(props: { page: number, setPage: (page: number) => unknown, maxPages: number, className?: string, style?: React.CSSProperties }) {

    function getSlotThree() {
        if (props.page < 5) {
            return 3;
        } else if (props.page >= props.maxPages - 3) {
            return props.maxPages - 4;
        } else {
            return props.page - 1
        }
    }

    function getSlotFour() {
        if (props.page < 5) {
            return 4;
        } else if (props.page >= props.maxPages - 3) {
            return props.maxPages - 3;
        } else {
            return props.page
        }
    }

    function getSlotFive() {
        if (props.page < 5) {
            return 5;
        } else if (props.page >= props.maxPages - 3) {
            return props.maxPages - 2;
        } else {
            return props.page + 1
        }
    }

    const renderedPages = props.maxPages < 7 ? Array.from({length: props.maxPages}, (_, i) => i + 1) :  [1,
        props.page < 5 ? 2 : "...",
        getSlotThree(),
        getSlotFour(),
        getSlotFive(),
        props.page >= props.maxPages - 3 ? props.maxPages - 1 : '...',
        props.maxPages]


    return <nav className={`group connected bottom-align no-margin ${props.className}`} style={{height: "100%", ...props.style, marginBottom: "1rem"}}>
        {renderedPages.map((value, index, array) => typeof value === "number" ? <button onClick={() => props.setPage(value)} className={clsx("circle", props.page === value ? "active" : "border", index === 0 ? "left-round" : index === array.length - 1 ? "right-round" : "no-round")}>{value}</button> : <button disabled style={{cursor: "text"}} className={clsx("circle", "transparent", index === 0 ? "left-round" : index === array.length - 1 ? "right-round" : "no-round")}>...</button>)}
    </nav>;
}