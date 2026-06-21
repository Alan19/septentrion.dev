import * as React from 'react';
import {Autocomplete} from '@base-ui/react/autocomplete';
import styles from './index.module.css';
import {artists} from "../../../../api/src/images/TagUtils.ts";
import {clsx} from "clsx";
import {type Control, Controller} from "react-hook-form";
import type {ImageValues} from "../../pages/gallery/uploader-modal/ArtworkUploader.tsx";

const limit = 5;

function ArtistAutocompleteImpl({field, value}: Readonly<{ value: string, field }>) {
    const {contains} = Autocomplete.useFilter({sensitivity: 'base'});

    const totalMatches = React.useMemo(() => {
        const trimmed = value?.trim();
        return trimmed ? artists.filter((t) => contains(t, trimmed)).length : artists.length;
    }, [value, contains]);

    const moreCount = Math.max(0, totalMatches - limit);

    return <Autocomplete.Root items={artists} openOnInputClick={!artists.includes(value)} value={field.value} onValueChange={field.onChange} limit={limit}>
        <div className={"field label border prefix no-margin"}>
            <i>palette</i>
            <Autocomplete.Input/>
            <label>Artist</label>
        </div>
        <Autocomplete.Portal>
            <Autocomplete.Positioner className={clsx(styles.Positioner)} sideOffset={4}>
                <Autocomplete.Popup className={clsx(styles.Popup, "large-elevate surface-container-high small-round")}>
                    <Autocomplete.List>
                        {(artist: string) => <Autocomplete.Item key={artist} className={"small-padding wave"} style={{cursor: "pointer"}} value={artist}>
                            <i style={{paddingLeft: '.5rem'}}>history</i><span style={{paddingLeft: '.5rem'}}>{artist}</span>
                        </Autocomplete.Item>}
                    </Autocomplete.List>
                    <Autocomplete.Status>
                        {moreCount > 0 ? <div className={"small-padding medium-opacity"}>{`Hiding ${moreCount} results (type a more specific query to narrow results)`}</div> : null}
                    </Autocomplete.Status>
                </Autocomplete.Popup>
            </Autocomplete.Positioner>
        </Autocomplete.Portal>
    </Autocomplete.Root>;
}

export default function ArtistAutocomplete({control, value}: Readonly<{ control: Control<ImageValues, any, ImageValues>, value: string | undefined }>) {
    return <Controller control={control} render={({field}) => <ArtistAutocompleteImpl field={field} value={value}/>} name={"artist"}/>;
}