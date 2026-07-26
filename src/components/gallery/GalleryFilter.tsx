import { Rating } from "../../util/images.ts";
import _ from "lodash";
import { persistentAtom } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import { ArtistFilter } from "./ArtistFilter.tsx";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { navigate } from "astro:transitions/client";

const isOpen = persistentAtom<string>('filter-sheet-open', "false");

export function FilterButton() {
    const $isOpen = useStore(isOpen);
    const open: boolean = JSON.parse($isOpen)

    return <button id="filter-button" className={clsx("transparent circle", open && 'primary')} onClick={() => isOpen.set(JSON.stringify(!open))} popoverTarget="filter-dialog" suppressHydrationWarning>
        <i className={clsx(open && 'fill')} suppressHydrationWarning>filter_alt</i>
    </button>
}

export function GalleryFilterContents(props: Readonly<{ artists: string[]; rating: Rating }>) {
    let [currentCharacter, setCurrentCharacter] = useState("");

    useEffect(() => {
        setCurrentCharacter(new URLSearchParams(window.location.search).get("character") ?? "");
    }, [])

    function selectCharacter(character: string) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("character") === character) {
            urlParams.delete("character");
        }
        else {
            urlParams.set("character", character);
        }
        if (urlParams.keys().toArray().length) {
            navigate('/gallery/search?' + urlParams.toString())
        }
        else {
            navigate('/gallery/mainstream')
        }
    }

    return <>
        <h3 className="secondary-text">Filters</h3>
        <h5>Artist</h5>
        <ArtistFilter artists={props.artists} />
        <h5>Rating</h5>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.values(Rating).map(value => <a href={`/gallery/${value}`} key={value}>
                <button className={clsx("chip small", (props.rating === value) && "primary primary-border")} style={{ viewTransitionName: "none" }}>{_.capitalize(value)}</button>
            </a>)}
        </div>
        <h5>Characters</h5>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {['Alcor', 'Rayan', 'Giove', 'Castor', 'Soma', 'Wilton'].map(value => <button onClick={() => selectCharacter(value)} key={value} className={clsx("chip small", currentCharacter === value && "primary primary-border")}>{_.capitalize(value)}</button>)}
        </div>
    </>;
}

export function GalleryFilter(props: Readonly<{ artists: string[], rating: Rating }>) {
    return <div id="side" className="surface l">
        <GalleryFilterContents artists={props.artists} rating={props.rating} />
    </div>
}