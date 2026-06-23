import * as React from 'react';
import {Combobox} from '@base-ui/react/combobox';
import styles from './index.module.css';
import {clsx} from "clsx";
import {ArtTag} from "../../../../api/src/images/TagUtils.ts";
import {type Control, Controller, type ControllerRenderProps} from "react-hook-form";
import type {ImageValues} from "../../pages/gallery/uploader-modal/ArtworkUploader.tsx";
import _ from "lodash";

function TagChip({field, selectedTags, tag}: Readonly<{ tag: string, field: ControllerRenderProps<ImageValues, "tags">, selectedTags: string[] }>) {
    return <button key={tag} className="chip" onClick={() => field.onChange(_.xor(selectedTags, [tag]))}>
        <span>{tag}</span>
        <i>close</i>
    </button>;
}

function TagCombobox({field, selectedTags}: Readonly<{ field: ControllerRenderProps<ImageValues, "tags">, selectedTags: ArtTag[] }>) {
    const id = React.useId();

    return <Combobox.Root value={field.value} items={Object.values(ArtTag)} multiple>
        <div className={styles.Container}>
            <Combobox.InputGroup className={clsx(styles.InputGroup, styles.Chips)}>
                <Combobox.Chips className={clsx(styles.InputArea, "left-padding")}>
                    <Combobox.Value>
                        {(selectedTags: string[]) => <React.Fragment>
                            {selectedTags.map((tag) => <TagChip key={tag} tag={tag} selectedTags={selectedTags} field={field}/>)}
                            <Combobox.Input id={id} placeholder={selectedTags.length > 0 ? '' : 'Tags'} className={clsx(styles.Input, "no-padding")}/>
                        </React.Fragment>}
                    </Combobox.Value>
                </Combobox.Chips>
                <Combobox.Trigger className={"transparent circle"} style={{marginRight: '.5rem', alignSelf: "center"}} aria-label="Open popup"><i>arrow_drop_down</i></Combobox.Trigger>
            </Combobox.InputGroup>
        </div>

        <Combobox.Portal>
            <Combobox.Positioner className={styles.Positioner} sideOffset={4}>
                <Combobox.Popup className={clsx(styles.Popup, "large-elevate surface-container-high small-round scroll small-height")}>
                    <Combobox.Empty>
                        <div className={styles.Empty}>No tags found.</div>
                    </Combobox.Empty>
                    <Combobox.List>
                        {(tag: string) => <Combobox.Item key={tag} className={"wave"} value={tag} onChange={() => field.onChange(_.xor(selectedTags, [tag]))} style={{cursor: "pointer"}}>
                            <label className={"checkbox search-target"} style={{display: "flex", alignItems: "center"}}>
                                <input readOnly type="checkbox" style={{marginLeft: '.5rem'}} checked={selectedTags.includes(tag as ArtTag)}/>
                                <span className={clsx(styles.ItemText)}>{tag}</span>
                            </label>
                        </Combobox.Item>}
                    </Combobox.List>
                </Combobox.Popup>
            </Combobox.Positioner>
        </Combobox.Portal>
    </Combobox.Root>;
}

export default function ExampleMultipleCombobox({control, selectedTags}: Readonly<{ control: Control<ImageValues, any, ImageValues>, selectedTags: ArtTag[] }>) {
    return <Controller render={({field}) => <TagCombobox field={field} selectedTags={selectedTags}/>} name={"tags"} control={control}/>;
}