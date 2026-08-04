import {Rating} from "../../util/images.ts";
import _ from "lodash";
import {type FieldValues, useForm} from "react-hook-form";
import dayjs from "dayjs";
import {toast, ToastContainer} from "react-toastify";
import {MultiSelect, type Option} from "react-multi-select-component";
import {useState} from "react";

export interface UploadFormData {
    file: File,
    tags: string[],
    rating: Rating,
    characters: string[],
    href?: string
}

export type ParentImageFormData = UploadFormData & {
    title: string,
    artist: string,
    published: string,
    hidden: boolean
}

interface IDefaultItemRendererProps {
    checked: boolean;
    option: Option;
    disabled?: boolean;
    onClick: () => void;
}

export function ArtUploader(props: Readonly<{ artists: string[] }>) {
    const {register, handleSubmit, setValue, watch} = useForm<Record<keyof ParentImageFormData, unknown>>({defaultValues: {published: dayjs().format("YYYY-MM-DD"), hidden: false}});
    const [uploading, setUploading] = useState(true);
    async function submit(fieldValues: FieldValues) {
        setUploading(true)
        const formData = Object.entries(fieldValues).reduce((previousValue, [key, value]) => {
            switch (key) {
                case "file":
                    previousValue.set('file', fieldValues.file[0]);
                    break;
                case "tags":
                case "characters":
                    previousValue.set(key, value.split(',').map((value1: string) => value1.trim()).toString())
                    break;
                case "hidden":
                    previousValue.set(key, JSON.stringify(value));
                    break;
                default:
                    previousValue.set(key, value);
                    break;
            }
            return previousValue;
        }, new FormData());
        console.log(formData)
        await fetch("/api/upload", {
            method: "POST",
            body: formData,
        }).then(() => toast("Upload success!")).finally(() => setUploading(false));
        // TODO Add more clear result messages
    }

    let artist = watch("artist") as string | undefined;
    let selectedArtist: Option[] = artist ? [{label: artist, value: artist}] : [];
    return <>
        <button popoverTarget={"uploader"} className="circle extra" style={{"position": "fixed", "bottom": '3rem', right: "3rem", zIndex: 2}}>
            <i>add</i>
        </button>
        <dialog id={"uploader"} popover={"auto"} style={{zIndex: 10}} suppressHydrationWarning>
            <h3 className={"bold"}>Upload Artwork</h3>
            <form onSubmit={handleSubmit(submit)} style={{display: "flex", flexDirection: "column"}}>
                <div className="field label prefix border">
                    <i>attach_file</i>
                    <input type="file" {...register("file", {required: true})}/>
                    <input type="text"/>
                    <label>File</label>
                </div>
                <div className="field label border">
                    <input type="text" {...register("title", {required: true})}/>
                    <label>Name</label>
                </div>
                <MultiSelect options={props.artists.map(value => ({value: value, label: value}))}
                             hasSelectAll={false}
                             isCreatable
                             value={selectedArtist}
                             valueRenderer={selected => selected.length
                                 ? selected.map(({ label }) => label)
                                 : "Artist"}
                             labelledBy={"Artist"}
                             onChange={(selected: Option[]) => {
                                 let clickedValue = selected.pop()?.value;
                                 setValue("artist", clickedValue);
                             }}
                             ItemRenderer={({checked, option, onClick, disabled}: IDefaultItemRendererProps) => <label className="radio tiny-padding" style={{display: "flex"}} onClick={onClick}>
                                 <input type="radio" checked={checked} disabled={disabled} readOnly />
                                 <span>{option.label}</span>
                             </label>}
                />
                <div className="field label border">
                    <input type="text" {...register("href")}/>
                    <label>Link</label>
                </div>
                <div className="field label border">
                    <input type="text" {...register("tags")}/>
                    <label>Tags</label>
                </div>
                <div className="field label border">
                    <input type="text" {...register("characters")}/>
                    <label>Characters</label>
                </div>
                <div className="field label border">
                    <input type="date" {...register("published")} defaultValue={new Date().toDateString()}/>
                    <label>Published</label>
                </div>
                <fieldset>
                    <legend>Rating</legend>
                    <nav>
                        {Object.values(Rating).map(value => <label className="radio" key={value}>
                                <input type="radio" value={value} {...register("rating", {required: true})}/>
                                <span>{_.capitalize(value)}</span>
                            </label>
                        )}
                    </nav>
                </fieldset>
                <label className="checkbox top-margin">
                    <input type="checkbox" {...register("hidden")} />
                    <span>Hidden</span>
                </label>
                <button disabled={uploading} className={"top-margin"}>Submit</button>
            </form>
        </dialog>
        <ToastContainer/>
    </>
}