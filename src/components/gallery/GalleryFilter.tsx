import {Rating} from "../../util/images.ts";
import _ from "lodash";
import {persistentAtom} from "@nanostores/persistent";
import {useStore} from "@nanostores/react";
import {clsx} from "clsx";
import {navigate} from "astro:transitions/client";

const isOpen = persistentAtom<string>('filter-sheet-open', "false");

export function FilterButton() {
    const $isOpen = useStore(isOpen);
    const open: boolean = JSON.parse($isOpen)

    return <button id="filter-button" className={clsx("transparent circle", open && 'primary')} onClick={() => isOpen.set(JSON.stringify(!open))} popoverTarget="filter-dialog" suppressHydrationWarning>
        <i className={clsx(open && 'fill')} suppressHydrationWarning>filter_alt</i>
    </button>
}

export function GalleryFilterContents(props: Readonly<{ artists: string[]; rating?: Rating }>) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    // Track this when we navigate from non-search to search
    if (props.rating) {
        urlSearchParams.set('rating', props.rating)
    }

    const getCurrentCharacter = () => urlSearchParams.get('character');
    const getCurrentRating = () => props.rating ?? urlSearchParams.get('rating');
    const getCurrentArtist = () => urlSearchParams.get('artist');


    const inSearchMode = () => {
        return getCurrentCharacter() || getCurrentArtist();
    }

    console.debug(getCurrentRating())

    function handleCharacterUpdate(character: string) {
        if (getCurrentCharacter() === character) {
            urlSearchParams.delete('character')
        } else {
            urlSearchParams.set('character', character)
        }
        if (inSearchMode()) {
            navigate('/gallery/search?' + urlSearchParams.toString());
        } else {
            navigate('/gallery/' + getCurrentRating())
        }
    }

    function handleRatingUpdate(rating: Rating) {
        if (getCurrentCharacter() || getCurrentArtist()) {
            urlSearchParams.set('rating', rating)
            navigate('/gallery/search?' + urlSearchParams.toString());
        } else {
            navigate('/gallery/' + rating)
        }
    }

    function handleArtistUpdate(artist: string) {
        if (!artist) {
            urlSearchParams.delete('artist')
        } else {
            urlSearchParams.set('artist', artist)
        }
        if (inSearchMode()) {
            navigate('/gallery/search?' + urlSearchParams.toString());
        } else {
            navigate('/gallery/' + getCurrentRating())
        }
    }

    return <>
        <h3 className="secondary-text">Filters</h3>
        <h5>Artist</h5>
        <div className="field label suffix border">
            <select value={getCurrentArtist() ?? ''} onChange={event => handleArtistUpdate(event.target.value)}>
                <option value={''}>All</option>
                {props.artists.toSorted((a, b) => a.localeCompare(b)).map(value => <option key={value} value={value}>{value}</option>)}
            </select>
            <label>Artist</label>
            <i>arrow_drop_down</i>
        </div>
        <h5>Rating</h5>
        <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
            {Object.values(Rating).map(value => <button onClick={() => handleRatingUpdate(value)}
                                                        key={value}
                                                        className={clsx("chip small", (getCurrentRating() === value) && "primary primary-border")}
                                                        style={{viewTransitionName: "none"}}>{_.capitalize(value)}</button>)}
        </div>
        <h5>Characters</h5>
        <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
            {['Alcor', 'Rayan', 'Giove', 'Castor', 'Soma', 'Wilton'].map(value => <button onClick={() => handleCharacterUpdate(value)} key={value} className={clsx("chip small", getCurrentCharacter() === value && "primary primary-border")}>{_.capitalize(value)}</button>)}
        </div>
    </>;
}