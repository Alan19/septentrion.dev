import {Dialog} from "@base-ui-components/react/dialog";
import styles from '../index.module.css';
import {clsx} from "clsx";
import dayjs, {type Dayjs} from "dayjs";
import React, {useState} from "react";
import {useTagHooks} from "../../../../hooks/useTagHooks.ts";
import {ArtTag, Rating} from "../../../../../api/src/images/TagUtils.ts";
import {BeerCssCombobox} from "../../../ui/BeerCssCombobox.tsx";
import {BeerCSSRadio} from "../../../ui/BeerCSSRadio.tsx";
import {BeerCSSTextField} from "../../../ui/BeerCSSTextField.tsx";
import {BeerCSSCheckbox} from "../../../ui/BeerCSSCheckbox.tsx";
import axios from "axios";
import {prepareFileName} from "../../../../../api/src/utils/utils.ts";
import {toast, ToastContainer} from "react-toastify";

export function ArtworkUploader() {
    const [selectedFile, setSelectedFile] = useState<File>();
    const {images} = useTagHooks();
    const [tags, setTags] = useState<ArtTag[]>([]);
    const [rating, setRating] = useState<Rating>();
    const [charactersInImage, setCharactersInImage] = useState<string[]>(["Alcor"])
    const [href, setHref] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [artist, setArtist] = useState<string>();
    const [uploading, setUploading] = useState<boolean>(false);
    const [publishedDate, setPublishedDate] = useState<Dayjs | null>(dayjs());
    const [isHidden, setIsHidden] = useState(false);

    function handleUpload(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        function handleSuccessfulUpload() {
            setSelectedFile(undefined);
            setTags([]);
            setHref("");
            setTitle("");
            setArtist("");
            setPublishedDate(dayjs())
            toast("Upload success!");
        }

        if (selectedFile && rating && title && artist) {
            setUploading(true);
            const formData = new FormData();
            formData.append("image", selectedFile);
            formData.append("tags", tags.join(", "));
            formData.append("title", title);
            formData.append("artist", artist);
            formData.append("href", href);
            formData.append("characters", charactersInImage.join(", "));
            formData.append("rating", rating)
            formData.append("published", publishedDate?.format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD"));
            formData.append("isHidden", JSON.stringify(isHidden));

            setUploading(true);
            axios.post("http://localhost:9000/upload", formData, {
                headers: {"Content-Type": "multipart/form-data"},
            })
                .then(() => handleSuccessfulUpload())
                .catch((reason) => console.log(reason))
                .finally(() => {
                    setUploading(false);
                });
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
            setTitle(event.target.files[0].name.split(".")[0]);
        }
    };

    const isCollision = images.map(value => prepareFileName(value.title)).includes(prepareFileName(title));

    return <>
        <Dialog.Root>
            <Dialog.Trigger className={"extend square round secondary"} style={{position: "fixed", bottom: "2rem", right: "2rem", display: "flex"}}><i>upload</i> <span>Upload</span></Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Backdrop className={styles.Backdrop}/>
                <Dialog.Popup className={clsx(styles.Popup, "surface")}>
                    <Dialog.Title className={styles.Title}><h5>Upload New Image</h5></Dialog.Title>
                    <Dialog.Description className={styles.Description}>
                        Enter a list of tags, the handle of the artist, and the file name to automatically compress and upload this file!
                    </Dialog.Description>
                    <div style={{display: "flex", flexDirection: "column", gap: "1rem"}} className={"bottom-margin"}>
                        <BeerCSSTextField onChange={handleFileChange} type={"file"} label={"File"} inputPrefix={<i>attach_file</i>}/>
                        <BeerCssCombobox placeholder={"Tags"} value={tags.map(value => ({label: value, value: value}))} options={Object.values(ArtTag).map(value => ({label: value, value: value}))} onChange={selectedOption => setTags(selectedOption.map(value => value.value))}/>
                        <BeerCSSTextField type={"text"} label={"Artist Handle"} inputPrefix={<i>palette</i>} value={artist} onChange={event => setArtist(event.target.value)}/>
                        <BeerCSSTextField type={"text"} label={"URL"} inputPrefix={<i>link</i>} value={href} onChange={event => setHref(event.target.value)}/>
                        <BeerCSSTextField errorText={isCollision && "The title already exists! This may overwrite that artwork entry!"} type={"text"} label={"Artwork Title"} inputPrefix={<i>title</i>} value={title} onChange={event => setTitle(event.target.value)}/>
                        <BeerCssCombobox isCreatable onChange={selectedOption => setCharactersInImage(selectedOption.map(value => value.value))} placeholder={"Characters"} value={charactersInImage.map(value => ({value: value, label: value}))} options={Array.from(new Set(images.flatMap(value => value.characters).concat(charactersInImage))).map(value => ({value: value, label: value}))}/>
                        <BeerCSSTextField type={"date"} label={"Published Date"} value={publishedDate?.format("YYYY-MM-DD")} onChange={event => setPublishedDate(dayjs(event.target.value))}/>
                        <fieldset className={"no-margin"}>
                            <legend>Rating</legend>
                            <nav>
                                <BeerCSSRadio label={"Mainstream"} checked={rating === "mainstream"} onChange={() => setRating(Rating.Mainstream)}/>
                                <BeerCSSRadio label={"General"} checked={rating === "general"} onChange={() => setRating(Rating.General)}/>
                                <BeerCSSRadio label={"Sensitive"} checked={rating === "sensitive"} onChange={() => setRating(Rating.Sensitive)}/>
                                <BeerCSSRadio label={"Mature"} checked={rating === "mature"} onChange={() => setRating(Rating.Mature)}/>
                            </nav>
                            <BeerCSSCheckbox checked={isHidden} onChange={() => setIsHidden(!isHidden)} label={"Hidden"} className={"top-margin"}/>
                        </fieldset>
                    </div>
                    <div className={styles.Actions}>
                        <button className={"primary"} onClick={handleUpload} disabled={uploading || (!title || !artist || !rating || !selectedFile)}>
                            <i>upload</i>
                            <span>Upload</span>
                        </button>
                        <button>
                            <Dialog.Close>Cancel</Dialog.Close>
                        </button>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
        <ToastContainer/>
    </>;
}