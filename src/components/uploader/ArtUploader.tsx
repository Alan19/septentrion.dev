import {Rating} from "../../util/images.ts";
import _ from "lodash";
import {type FieldValues, useForm} from "react-hook-form";
import dayjs from "dayjs";
import {toast, ToastContainer} from "react-toastify";

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

export function ArtUploader() {
    const {register, handleSubmit} = useForm<Record<keyof ParentImageFormData, unknown>>({defaultValues: {published: dayjs().format("YYYY-MM-DD"), hidden: false}});


    async function submit(fieldValues: FieldValues) {
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
                    previousValue.set(key, JSON.stringify(value))
                default:
                    previousValue.set(key, value);
                    break;
            }
            return previousValue;
        }, new FormData());
        console.log(formData)
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        }).then(value => toast("Upload success!"));
        // TODO Add toast, maybe add formatting
    }

    return <>
        <button popoverTarget={"uploader"} className="circle extra" style={{"position": "fixed", "bottom": '3rem', right: "3rem", zIndex: 10}}>
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
                <div className="field label border">
                    <input type="text" {...register("artist", {required: true})}/>
                    <label>Artist</label>
                </div>
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
                        {Object.values(Rating).map(value => <label className="radio">
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
                <button className={"top-margin"}>Submit</button>
            </form>
        </dialog>
        <ToastContainer/>
    </>
}