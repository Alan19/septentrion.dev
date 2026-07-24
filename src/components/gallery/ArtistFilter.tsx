import {navigate} from "astro:transitions/client";
import {useEffect, useState} from "react";

export function ArtistFilter(props: Readonly<{ artists: string[] }>) {
    const [artist, setArtist] = useState('')
    useEffect(() => {
        setArtist(new URL(document.location.toString()).searchParams.get('artist') ?? '')
    }, [])

    return (
        <div className="field label suffix border">
            <select value={artist ?? ''} onChange={event => {
                let href = `/gallery/search?artist=${event.target.value}`;
                console.debug(href)
                return navigate(href, {history: artist ? "replace" : "auto"});
            }}>
                <option hidden value={''} disabled></option>
                {props.artists.map(value => <option key={value} value={value}>{value}</option>)}
            </select>
            <label>Artist</label>
            <i>arrow_drop_down</i>
        </div>
    )
}