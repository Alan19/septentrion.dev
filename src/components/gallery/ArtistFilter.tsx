import {navigate} from "astro:transitions/client";

export function ArtistFilter(props: { artists: string[] }) {
    return (
        <div className="field label suffix border">
            <select onChange={event => {
                let href = `?artist=${event.target.value}`;
                console.log(href)
                return navigate(href);
            }}>
                {props.artists.map(value => <option value={value}>{value}</option>)}
            </select>
            <label>Artist</label>
            <i>arrow_drop_down</i>
        </div>

    )
}