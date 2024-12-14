import React, {useState} from "react";
import axios from "axios";
import {Autocomplete, Checkbox, createFilterOptions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Stack, TextField, Typography,} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddIcon from "@mui/icons-material/Add";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {useIsDevelopment} from "./UseIsDevelopment";
import {Button} from "@mui/material-next";
import {ArtTag, characters, Rating} from "./TagUtils";
import {AutocompleteFilterChip} from "./FilterPane";
import {useTagHooks} from "./UseTagHooks";
import {prepareFileName} from "./Utils";

const filter = createFilterOptions<string>();
export default function Uploader(props: { loadImageInfo: () => Promise<void>; }) {
    const [selectedFile, setSelectedFile] = useState<File>();
    const {images} = useTagHooks();
    const [tags, setTags] = useState<ArtTag[]>([]);
    const [rating, setRating] = useState<Rating>();
    const [charactersInImage, setCharactersInImage] = useState<string[]>(["Alcor"])
    const [href, setHref] = useState("");
    const [title, setTitle] = useState<string>("");
    const [artist, setArtist] = useState<string>();
    const [uploading, setUploading] = useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [publishedDate, setPublishedDate] = React.useState<Dayjs | null>(dayjs());
    const {isDevelopment} = useIsDevelopment();

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
        _event: React.SyntheticEvent | Event,
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
            formData.append(
                "published",
                publishedDate?.format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD")
            );
            setUploading(true);
            axios
                .post("http://localhost:9000/upload", formData, {
                    headers: {"Content-Type": "multipart/form-data"},
                })
                .then(() => props.loadImageInfo().then(handleSuccessfulUpload))
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

    const isCollision = images.map(value => prepareFileName(value.title)).includes(prepareFileName(title));
    return (
        <>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Artwork uploaded!"
            />
            {
                isDevelopment && <Button
                    variant={"filled"}
                    name={"Upload"}
                    color="primary"
                    aria-label="add"
                    size={"small"}
                    onClick={handleClickOpen}
                >
                    <AddIcon/> Upload
                </Button>
            }
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload New Image</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a list of tags, the handle of the artist, and the file name to
                        automatically compress and upload this file!
                    </DialogContentText>
                    <Stack spacing={2} style={{marginTop: 16}}>
                        <div>
                            <Button
                                variant={"outlined"}
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
                            <Typography style={{marginLeft: "8px"}} component={"span"}>{selectedFile && selectedFile.name}</Typography>
                        </div>
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
                        <Autocomplete
                            fullWidth
                            value={rating}
                            onChange={(_event, value) => setRating(value ?? Rating.General)}
                            id="upload-rating-selector"
                            options={Object.values(Rating)}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                                <TextField {...params} label="Rating Selection" placeholder="Rating"/>
                            )}
                        />
                        {/*TODO Extract this into a component*/}
                        <Autocomplete multiple
                                      renderInput={(params) => (
                                          <TextField
                                              {...params}
                                              label="Character List"
                                              placeholder="Character"
                                              fullWidth
                                          />
                                      )}
                                      selectOnFocus
                                      clearOnBlur
                                      handleHomeEndKeys
                                      value={charactersInImage}
                                      onChange={(_event, value) => setCharactersInImage(value)}
                                      size={"medium"}
                                      renderTags={(value, getTagProps) => value.map((option, index) => <AutocompleteFilterChip option={option} tagProps={getTagProps({index})}/>)}
                                      filterOptions={(options, params) => {
                                          const filtered = filter(options, params)
                                          const {inputValue} = params;
                                          // Suggest the creation of a new value
                                          const isExisting = options.some((option) => inputValue === option);
                                          if (inputValue !== '' && !isExisting) {
                                              filtered.push(inputValue);
                                          }

                                          return filtered;
                                      }}
                                      options={characters}/>
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
                            helperText={isCollision ? "The title already exists! This may overwrite that artwork entry!" : ""}
                            error={isCollision}
                            onChange={handleTitleChange}
                            required
                        />
                        <DatePicker
                            label={"Published Date"}
                            value={publishedDate}
                            onChange={(value) => setPublishedDate(value)}
                        />
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant={"filled"} disabled={uploading || (!title || !artist || !rating)} onClick={handleUpload}>
                        {uploading ? "Uploading..." : "Upload"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
