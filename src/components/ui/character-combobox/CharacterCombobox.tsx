import {Combobox} from "@base-ui/react/combobox";
import {characters} from "../../../../api/src/images/TagUtils.ts";
import * as React from "react";
import {useState} from "react";
import _ from "lodash";
import styles from "./index.module.css"
import {clsx} from "clsx";
import {type Control, Controller} from "react-hook-form";
import type {ImageValues} from "../../pages/gallery/uploader-modal/ArtworkUploader.tsx";

export function CharacterCombobox({field}: Readonly<{ field: Control<ImageValues, any, ImageValues> }>) {
    const [textFieldValue, setTextFieldValue] = useState('')
    return <Controller name={"characters"} control={field} render={({field}) => <Combobox.Root items={Array.from(new Set(characters.concat(field.value)))} multiple value={field.value} modal>
        <Combobox.InputGroup className={clsx("border")} style={{borderRadius: 4, display: "flex", gap: '.25rem', alignItems: "center", cursor: "text"}}>
            <Combobox.Chips style={{display: "flex", gap: '.25rem', flexWrap: "wrap", flex: 1, alignItems: "center", paddingLeft: 16, paddingTop: 8, paddingBottom: 8}}>
                <i style={{paddingRight: 4}}>person_add</i>
                <Combobox.Value>
                    {(selectedCharacters: string[]) => <React.Fragment>
                        {selectedCharacters.map(characterName => <button className={"chip secondary-container no-border"} key={characterName} onClick={() => field.onChange(_.xor(field.value, [characterName]))}>
                            <span>{characterName}</span>
                            <i>close</i>
                        </button>)}
                        <Combobox.Input value={textFieldValue} onChange={event => setTextFieldValue(event.target.value)} placeholder={field.value.length === 0 ? "Characters" : ""} className={"no-border transparent"} style={{outline: "none", height: 32, fontSize: '1rem', fontFamily: 'Outfit Variable', minWidth: '3rem', flex: 1}}/>
                    </React.Fragment>}
                </Combobox.Value>
            </Combobox.Chips>
            <Combobox.Clear onClick={() => field.onChange([])} className={"transparent circle"}><i>clear_all</i></Combobox.Clear>
            <Combobox.Trigger className={"transparent circle"} style={{marginRight: 8}}><i>arrow_drop_down</i></Combobox.Trigger>
        </Combobox.InputGroup>

        <Combobox.Portal>
            <Combobox.Positioner sideOffset={4} style={{zIndex: 1000}}>
                <Combobox.Popup className={clsx("large-elevate surface-container-high small-round scroll small-height", styles.Popup)}>
                    {textFieldValue && !characters.includes(textFieldValue) && <Combobox.Item className={"wave search-target"} value={textFieldValue} onClick={event => {
                        field.onChange(field.value.concat(textFieldValue));
                        setTextFieldValue('')
                    }}>
                        <i>add</i>
                        <span className={styles.ItemText}>Create "{textFieldValue}"</span>
                    </Combobox.Item>}
                    <Combobox.List>
                        {(item: string) => <Combobox.Item key={item} className={"wave search-target"} value={item} onClick={() => {
                            field.onChange(_.xor(field.value, [item]));
                            setTextFieldValue('')
                        }}>
                            <i className={"fill primary-text"}>{field.value.includes(item) ? 'check_box' : 'check_box_outline_blank'}</i>
                            <span>{item}</span>
                        </Combobox.Item>}
                    </Combobox.List>
                </Combobox.Popup>
            </Combobox.Positioner>
        </Combobox.Portal>
    </Combobox.Root>}/>
}