import _ from "lodash";
import {type FieldValues, useForm} from "react-hook-form";
import dayjs from "dayjs";
import {toast, ToastContainer} from "react-toastify";
import {MultiSelect, type Option} from "react-multi-select-component";
import {Rating} from "../../util/rating.ts";
import type {ImageInformation} from "../../util/images.ts";
import './uploader.css'
import type {IDefaultItemRendererProps} from "../../util/consts.ts";

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
    type: "parent"
}

export type AltImageFormData = UploadFormData & {
    altType: "complex" | "cropped" | "recolor" | "extra";
    complexInfo?: { pageNumber?: number, altNumber?: number },
    type: "alt"
}

async function submit(fieldValues: FieldValues) {
    console.log("Uploading!", fieldValues)
    const formData = Object.entries(fieldValues).reduce((previousValue, [key, value]) => {
        switch (key) {
            case "file":
                previousValue.set('file', fieldValues.file[0]);
                break;
            case "tags":
            case "characters":
                previousValue.set(key, value.map((value1: string) => value1.trim()).join(',').toString())
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
    }).then(() => toast("Upload success!"));
    // TODO Add more clear result messages
}

/**
 * Common props between parent and alt images
 */
interface BaseUploaderProps {
    characters: string[],
    tags: string[]
}

interface ParentUploaderProps extends BaseUploaderProps {
    type: "parent",
    artists: string[]
}

interface AltUploaderProps extends BaseUploaderProps {
    type: "alt",
    parent: ImageInformation,
    isParentHidden: boolean
}

export function ArtUploader(props: Readonly<ParentUploaderProps | AltUploaderProps>) {
    const isParent = props.type === "parent";
    const {register, handleSubmit, setValue, watch, formState} = useForm<ParentImageFormData | AltImageFormData>({
        defaultValues: {
            published: dayjs().format("YYYY-MM-DD"),
            hidden: isParent ? false : props.isParentHidden,
            href: props.type === "alt" ? props.parent.href : "",
            characters: props.type === "alt" ? props.parent.characters : ["Alcor"],
            tags: props.type === "alt" ? props.parent.tags : [],
            type: isParent ? "parent" : "alt"
        }
    });

    let artist = watch("artist");
    let selectedArtist: Option[] = artist ? [{label: artist, value: artist}] : [];
    const tags = watch("tags") as string[] | undefined;
    const selectedTags: Option[] = tags?.map(value => ({label: value, value: value})) ?? [];

    const characters = watch("characters") as string[] | undefined;
    const selectedCharacters: Option[] = characters?.map(value => ({label: value, value: value})) ?? [];
    return <>
        <button popoverTarget={"uploader"} className="circle extra" style={{"position": "fixed", "bottom": '3rem', right: "3rem", zIndex: 2}} suppressHydrationWarning>
            <i>add</i>
        </button>
        <dialog id={"uploader"} popover={"auto"} style={{zIndex: 10}} suppressHydrationWarning
                className={"large-width"}>
            <h3 className={"bold"}>Upload Artwork</h3>
            <form onSubmit={handleSubmit(submit)} style={{display: "flex", flexDirection: "column"}}>
                <div className="field label prefix border">
                    <i>attach_file</i>
                    <input type="file" {...register("file", {required: true})}/>
                    <input type="text"/>
                    <label>File</label>
                </div>

                {isParent && <div className="field label border">
                    <input type="text" {...register("title", {required: true})}/>
                    <label>Name</label>
                </div>}

                {isParent && <MultiSelect options={props.artists.map(value => ({value: value, label: value}))}
                                          hasSelectAll={false}
                                          isCreatable
                                          value={selectedArtist}
                                          valueRenderer={selected => selected.length ? selected.map(({label}) => label) : "Artist"}
                                          labelledBy={"Artist"}
                                          onChange={(selected: Option[]) => setValue("artist", selected.pop()?.value)}
                                          ItemRenderer={({
                                                             checked,
                                                             option,
                                                             onClick,
                                                             disabled
                                                         }: IDefaultItemRendererProps) => <label
                                              className="radio tiny-padding" style={{display: "flex"}}
                                              onClick={onClick}>
                                              <input type="radio" checked={checked} disabled={disabled} readOnly/>
                                              <span>{option.label}</span>
                                          </label>}
                />}

                <div className="field label border">
                    <input type="text" {...register("href")}/>
                    <label>Link</label>
                </div>

                <MultiSelect options={props.tags.map(value => ({value: value, label: value}))}
                             hasSelectAll={false}
                             isCreatable
                             value={selectedTags}
                             valueRenderer={selected => selected.length ? selected.map(({label}) => <button
                                 type={"button"} key={label} className="chip small fill round"
                                 style={{marginRight: '.25rem'}}>
                                 <span>{label}</span>
                                 <i>close</i>
                             </button>) : "Tags"}
                             labelledBy={"Tags"}
                             onChange={(selected: Option[]) => setValue("tags", selected.map(value => value.value))}
                             ItemRenderer={({checked, option, onClick, disabled}: IDefaultItemRendererProps) => <label
                                 className="checkbox tiny-padding" style={{display: "flex"}} onClick={onClick}>
                                 <input type="checkbox" checked={checked} disabled={disabled} readOnly/>
                                 <span>{option.label}</span>
                             </label>}
                />

                <MultiSelect options={props.characters.map(value => ({value: value, label: value}))}
                             hasSelectAll={false}
                             isCreatable
                             value={selectedCharacters}
                             valueRenderer={selected => selected.length ? selected.map(({label}) => <button
                                 type={"button"} key={label} className="chip small fill round"
                                 style={{marginRight: '.25rem'}}>
                                 <span>{label}</span>
                                 <i>close</i>
                             </button>) : "Characters"}
                             labelledBy={"Characters"}
                             onChange={(selected: Option[]) => setValue("characters", selected.map(value => value.value))}
                             ItemRenderer={({checked, option, onClick, disabled}: IDefaultItemRendererProps) => <label
                                 className="checkbox tiny-padding" style={{display: "flex"}} onClick={onClick}>
                                 <input type="checkbox" checked={checked} disabled={disabled} readOnly/>
                                 <span>{option.label}</span>
                             </label>}
                />

                {isParent && <div className="field label border">
                    <input type="date" {...register("published")} defaultValue={new Date().toDateString()}/>
                    <label>Published</label>
                </div>}

                {!isParent && <fieldset className={"no-margin"}>
                    <legend>Alt Type</legend>
                    <nav>
                        {["extra", "cropped", "recolor", "complex"].map(value => <label className="radio" key={value}>
                                <input type="radio" value={value} {...register("altType", {required: true})}/>
                                <span>{_.capitalize(value)}</span>
                            </label>
                        )}
                    </nav>
                    {/*<div className={"grid"} style={{width: "100%"}}>*/}
                    {/*    {watchAltType === "complex" && <>*/}
                    {/*        <div className={"s12 m6"}>*/}
                    {/*            <BeerCSSTextField label={"Page"} type={"number"} {...register("complexInfo.pageNumber")} />*/}
                    {/*        </div>*/}
                    {/*        <div className={"s12 m6"}>*/}
                    {/*            <BeerCSSTextField label={"Alt"} type={"number"} {...register("complexInfo.altNumber")} />*/}
                    {/*        </div>*/}
                    {/*    </>}*/}
                    {/*</div>*/}
                </fieldset>}

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
                    <input type="checkbox" {...register("hidden")}
                           disabled={props.type === "alt" && props.isParentHidden}/>
                    <span>Hidden</span>
                </label>
                <input disabled={!formState.isValid || formState.isSubmitting} type={"submit"}
                       className={"button top-margin"}/>
            </form>
        </dialog>
        <ToastContainer/>
    </>
}