import React, {useState} from "react";
import axios from 'axios';
import {Autocomplete, AutocompleteValue, Checkbox, TextField} from "@mui/material";
import {ArtTag} from "../ImageData";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function Uploader() {
    const [selectedFile, setSelectedFile] = useState<Blob>();
    const [uploading, setUploading] = useState(false);
    const [tags, setTags] = useState<ArtTag[]>([]);
    const [href, setHref] = useState('');
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
            setTitle(event.target.files[0].name);
        }
    };

    const handleTagsChange = (event: React.SyntheticEvent, value: ArtTag[]) => {
        setTags(value);
    };


    function handleUpload(e: any) {
        e.preventDefault();
        if (selectedFile) {
            setUploading(true);
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('tags', tags.join(', '));
            formData.append('title', title);
            formData.append('artist', artist);
            formData.append('href', href)
            axios.post('http://localhost:9000/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                .then(value => console.log(value.data))
                .catch(reason => console.log(reason))
                .finally(() => setUploading(false));
        }
    }

    function handleHrefChange(event: React.ChangeEvent<HTMLInputElement>) {
        setHref(event.target.value)
    }

    function handleArtistChange(event: React.ChangeEvent<HTMLInputElement>) {
        setArtist(event.target.value)
    }

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    return (
        <div>
            <form onSubmit={handleUpload}>
                <input type="file" name={"image"} onChange={handleFileChange}/>
                <Autocomplete
                    multiple
                    value={tags}
                    onChange={(event, value) => handleTagsChange(event, value)}
                    id="upload-tag-selector"
                    options={Object.values(ArtTag)}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option}
                    renderOption={(props, option, {selected}) => (
                        <li {...props}>
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon fontSize="small"/>}
                                checkedIcon={<CheckBoxIcon fontSize="small"/>}
                                style={{marginRight: 8}}
                                checked={selected}
                            />
                            {option}
                        </li>
                    )}
                    style={{width: 500}}
                    renderInput={(params) => (
                        <TextField {...params} label="Tag Selection" placeholder="Tags"/>
                    )}
                />
                <input type="text" placeholder="Source" value={href} onChange={handleHrefChange}/>
                <input type="text" placeholder="Artist" value={artist} onChange={handleArtistChange}/>
                <input type="text" placeholder="Title" value={title} onChange={handleTitleChange}/>
                <button type={"submit"}
                        disabled={uploading && !!selectedFile}>{uploading ? 'Uploading...' : 'Upload'}</button>
            </form>
        </div>
    );
}