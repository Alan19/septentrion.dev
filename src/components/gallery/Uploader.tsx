import React, {useState} from "react";
import axios from "axios";
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
    TextField,
    Typography,
} from "@mui/material";
import {ArtTag} from "../ImageData";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddIcon from "@mui/icons-material/Add";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";

export default function Uploader(props: {
    loadImageInfo: () => Promise<void>;
}) {
    const [selectedFile, setSelectedFile] = useState<Blob>();
    const [tags, setTags] = useState<ArtTag[]>([]);
    const [href, setHref] = useState("");
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [uploading, setUploading] = useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [publishedDate, setPublishedDate] = React.useState<Dayjs | null>(dayjs());

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
            setTitle(event.target.files[0].name.split(".")[0]);
        }
    };

    const handleTagsChange = (event: React.SyntheticEvent, value: ArtTag[]) => {
        setTags(value);
    };

    const handleSnackbarClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
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
            setHref("");
            setTitle("");
            setArtist("");
            setPublishedDate(dayjs())
            setSnackbarOpen(true);
        }

        if (selectedFile) {
            setUploading(true);
            const formData = new FormData();
            formData.append("image", selectedFile);
            formData.append("tags", tags.join(", "));
            formData.append("title", title);
            formData.append("artist", artist);
            formData.append("href", href);
            formData.append(
                "published",
                publishedDate?.format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD")
            );
            setUploading(true);
            axios
                .post("http://localhost:9000/upload", formData, {
                    headers: {"Content-Type": "multipart/form-data"},
                })
                .then((value) => props.loadImageInfo().then(handleSuccessfulUpload))
                .catch((reason) => console.log(reason))
                .finally(() => {
                    setUploading(false);
                });
        }
    }

    function handleHrefChange(event: React.ChangeEvent<HTMLInputElement>) {
        setHref(event.target.value);
    }

    function handleArtistChange(event: React.ChangeEvent<HTMLInputElement>) {
        setArtist(event.target.value);
    }

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    const fabStyle = {
        position: "fixed",
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
            <Fab
                sx={fabStyle}
                color="primary"
                aria-label="add"
                onClick={handleClickOpen}
            >
                <AddIcon/>
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload New Image</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a list of tags, the handle of the artist, and the file name to
                        automatically compress and upload this file!
                    </DialogContentText>
                    <Button
                        variant="contained"
                        component="label"
                        style={{marginBottom: "16px", marginTop: "8px"}}
                    >
                        Upload File
                        <input
                            type="file"
                            name={"image"}
                            onChange={handleFileChange}
                            hidden
                        />
                    </Button>
                    <Typography style={{marginLeft: "8px"}}
                                component={"span"}>{selectedFile && selectedFile.name}</Typography>
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
                        required
                        style={{marginBottom: "16px"}}
                    />
                    <DatePicker
                        label={"Published Date"}
                        value={publishedDate}
                        onChange={(value) => setPublishedDate(value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={uploading} onClick={handleUpload}>
                        {uploading ? "Uploading..." : "Upload"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
