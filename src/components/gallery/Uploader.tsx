import React, {useState} from "react";
import axios from 'axios';
import {
    Autocomplete,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Snackbar,
    TextField
} from "@mui/material";
import {ArtTag} from "../ImageData";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddIcon from "@mui/icons-material/Add";

export default function Uploader(props: { loadImageInfo: () => Promise<void>; }) {
    const [selectedFile, setSelectedFile] = useState<Blob>();
    const [tags, setTags] = useState<ArtTag[]>([]);
    const [href, setHref] = useState('');
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [uploading, setUploading] = useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
            setTitle(event.target.files[0].name.split('.')[0]);
        }
    };

    const handleTagsChange = (event: React.SyntheticEvent, value: ArtTag[]) => {
        setTags(value);
    };

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };


    function handleUpload(e: any) {
        e.preventDefault();

        function handleSuccessfulUpload() {
            handleClose();
            setSelectedFile(undefined);
            setTags([]);
            setHref('');
            setTitle('');
            setArtist('');
            setSnackbarOpen(true);
        }

        if (selectedFile) {
            setUploading(true);
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('tags', tags.join(', '));
            formData.append('title', title);
            formData.append('artist', artist);
            formData.append('href', href);
            setUploading(true);
            axios.post('http://localhost:9000/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                .then(value => props.loadImageInfo().then(handleSuccessfulUpload))
                .catch(reason => console.log(reason))
                .finally(() => {
                    setUploading(false);
                });
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

    const fabStyle = {
        position: 'fixed',
        bottom: 16,
        right: 16,
    };

    return (
        <>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Artwork uploaded!"
            />
            <Fab sx={fabStyle} color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon/>
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload New Image</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a list of tags, the handle of the artist, and the file name to automatically compress and
                        upload this file!
                    </DialogContentText>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload File
                        <input
                            type="file"
                            name={"image"}
                            onChange={handleFileChange}
                            hidden
                        />
                    </Button>
                    <Autocomplete
                        multiple
                        fullWidth
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
                        renderInput={(params) => (
                            <TextField {...params} label="Tag Selection" placeholder="Tags"/>
                        )}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="href"
                        label="Link URL"
                        type="url"
                        fullWidth
                        variant="standard"
                        value={href}
                        onChange={handleHrefChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="href"
                        label="Artist Handle"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={artist}
                        onChange={handleArtistChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="href"
                        label="Art Title"
                        type="url"
                        fullWidth
                        variant="standard"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpload}>Upload</Button>
                </DialogActions>
                {/*<button type={"submit"}*/}
                {/*        disabled={uploading && !!selectedFile}>{uploading ? 'Uploading...' : 'Upload'}</button>*/}
            </Dialog>
        </>
    );
}