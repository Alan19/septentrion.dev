import {Combobox} from "@base-ui/react/combobox";
import * as React from "react";
import {useState} from "react";
import _ from "lodash";
import {clsx} from "clsx";
import {type Control, Controller} from "react-hook-form";
import type {ImageValues} from "../../pages/gallery/uploader-modal/ArtworkUploader.tsx";

export function MaterialCombobox({field, creatable = false, items, name, prefixIcon, placeholder}: Readonly<{ field: Control<ImageValues, any, ImageValues>, creatable: boolean, name: keyof ImageValues, items: unknown[], prefixIcon?: string, placeholder?: string }>) {
    const [textFieldValue, setTextFieldValue] = useState('')
    return <Controller name={name} control={field} render={({field}) => {
        const {onChange, value} = field as { onChange: (value: unknown) => void, value: unknown[] };
        // Have current value at start, then custom values, then selected values, then everything else
        const dropdownItems = Array.from(new Set([...(creatable && textFieldValue ? [textFieldValue] : Array.of()), ...value, ...items]));
        return <Combobox.Root items={creatable ? dropdownItems : items} multiple value={value} modal autoHighlight highlightItemOnHover>
            <Combobox.InputGroup className={clsx("border")} style={{borderRadius: 4, display: "flex", gap: '.25rem', alignItems: "center", cursor: "text"}}>
                <Combobox.Chips style={{display: "flex", gap: '.25rem', flexWrap: "wrap", flex: 1, alignItems: "center", paddingLeft: 16, paddingTop: 8, paddingBottom: 8}}>
                    {prefixIcon && <i style={{paddingRight: 4}}>{prefixIcon}</i>}
                    <Combobox.Value>
                        {(selectedItems: string[]) => <React.Fragment>
                            {selectedItems.map(item => <button className={"chip secondary-container no-border"} key={item} onClick={() => onChange(_.xor(value, [item]))}>
                                <span>{item}</span>
                                <i>close</i>
                            </button>)}
                            <Combobox.Input onKeyDown={event => {
                                if (event.key === "Backspace" && textFieldValue === "") {
                                    onChange(value.slice(0, -1))
                                }
                            }} value={textFieldValue} onChange={event => setTextFieldValue(event.target.value)} placeholder={value.length === 0 ? placeholder : ""} className={"no-border transparent"} style={{outline: "none", height: 32, fontSize: '1rem', fontFamily: 'Outfit Variable', minWidth: '3rem', flex: 1}}/>
                        </React.Fragment>}
                    </Combobox.Value>
                </Combobox.Chips>
                <Combobox.Clear onClick={() => onChange([])} className={"transparent circle"}><i>clear_all</i></Combobox.Clear>
                <Combobox.Trigger className={"transparent circle"} style={{marginRight: 8}}><i>arrow_drop_down</i></Combobox.Trigger>
            </Combobox.InputGroup>

            <Combobox.Portal>
                <Combobox.Positioner sideOffset={4} style={{zIndex: 1000}}>
                    <Combobox.Popup className={clsx("large-elevate surface-container-high small-round scroll small-height")} style={{width: 'var(--anchor-width)', maxWidth: 'var(--available-width)', maxHeight: 'min(var(--available-height), 24.5rem)'}}>

                        <Combobox.List>
                            {(item: string) => (![...value, ...items].includes(item) && textFieldValue) ? <Combobox.Item className={"wave search-target"} value={textFieldValue} onClick={() => {
                                onChange(value.concat(textFieldValue));
                                setTextFieldValue('')
                            }}>
                                <i>add</i>
                                <span>Create "{textFieldValue}"</span>
                            </Combobox.Item> : <Combobox.Item key={item} className={"search-target"} value={item} onClick={() => {
                                onChange(_.xor(value, [item]));
                                setTextFieldValue('')
                            }}>
                                <i className={"fill primary-text"}>{value.includes(item) ? 'check_box' : 'check_box_outline_blank'}</i>
                                <span>{item}</span>
                            </Combobox.Item>}
                        </Combobox.List>
                    </Combobox.Popup>
                </Combobox.Positioner>
            </Combobox.Portal>
        </Combobox.Root>;
    }}/>
}