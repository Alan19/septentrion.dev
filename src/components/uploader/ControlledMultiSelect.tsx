import {useController, type UseControllerProps} from "react-hook-form";
import {MultiSelect, type Option} from "react-multi-select-component";
import type {ParentImageFormData} from "./ArtUploader.tsx";

function ControlledMultiSelect(props: UseControllerProps & {options: string[]}) {
    const { field, fieldState } = useController(props);

    return <MultiSelect options={props.options.map(value => ({value: value, label: value}))} value={field.value} labelledBy={field.name} />
}