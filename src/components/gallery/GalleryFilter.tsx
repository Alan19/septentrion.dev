import {useStore} from "@nanostores/react";
import {selectedTag} from "./filterStore.ts";

export function GalleryFilter(props: Readonly<{ tags: string[] }>) {
    return <div className="field suffix border">
        <select onChange={event => selectedTag.set(event.target.value)}>
            {Array.from(props.tags.map(value => <option key={value} value={value}>{value}</option>))}
        </select>
        <i>arrow_drop_down</i>
    </div>
}