import _ from "lodash";
import {persistentAtom} from "@nanostores/persistent";
import {useStore} from "@nanostores/react";
import {clsx} from "clsx";
import {navigate} from "astro:transitions/client";
import {isDev} from "../../util/consts.ts";
import {Rating} from "../../util/rating.ts";
import {useState} from "react";

const isOpen = persistentAtom<string>('filter-sheet-open', "false");

export function FilterButton() {
    const $isOpen = useStore(isOpen);
    const open: boolean = JSON.parse($isOpen)

    return <button id="filter-button"
                   className={clsx("transparent circle", open && 'primary')}
                   popoverTarget="filter-dialog"
                   suppressHydrationWarning>
        <i className={clsx(open && 'fill')} suppressHydrationWarning>filter_alt</i>
    </button>
}

export function GalleryFilterContents(props: Readonly<{ artists: string[]; rating?: Rating }>) {
    const [searchValue, setSearchValue] = useState('');

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

    return <div>
        <legend className="secondary-text bold"><h3>Filters</h3></legend>
        <h5>Artist</h5>
        <div className="field large prefix round fill active">
            <i className="front">search</i>
            <input value={getCurrentArtist() ?? ""}/>
            <menu className="min">
                <li className="transparent">
                    <div className="field large prefix">
                        <i className="front" onClick={() => {
                            if (getCurrentArtist()){
                                handleArtistUpdate('')
                            }
                        }}>{getCurrentArtist() ? 'clear' : 'arrow_back'}</i>
                        <input value={searchValue} onChange={event => setSearchValue(event.target.value)}/>
                    </div>
                </li>
                {props.artists
                    .toSorted((a, b) => a.localeCompare(b))
                    .filter(value => value.includes(searchValue))
                    .map(value => <li onClick={() => handleArtistUpdate(value)}>
                        <i>palette</i>
                        <div>{value}</div>
                    </li>)}

            </menu>
        </div>
        <h5>Rating</h5>
        <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
            {Object.values(Rating)
                .filter(value => value !== Rating.Mature || value === Rating.Mature && isDev).map(value => <button
                    onClick={() => handleRatingUpdate(value)}
                    key={value}
                    className={clsx("chip small", (getCurrentRating() === value) && "primary primary-border")}
                    style={{viewTransitionName: "none"}}>{_.capitalize(value)}</button>)}
        </div>
        <h5>Characters</h5>
        <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
            {['Alcor', 'Rayan', 'Giove', 'Castor', 'Soma', 'Wilton'].map(value => <button
                onClick={() => handleCharacterUpdate(value)} key={value}
                className={clsx("chip small", getCurrentCharacter() === value && "primary primary-border")}>{_.capitalize(value)}</button>)}
        </div>
    </div>;
}