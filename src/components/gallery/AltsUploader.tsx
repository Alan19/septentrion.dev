import React, {useState} from "react";
import axios from "axios";
import {Autocomplete, Checkbox, createFilterOptions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Snackbar, TextField, Typography,} from "@mui/material";
import {ImageInformation} from "../ImageInformation";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddIcon from "@mui/icons-material/Add";
import {useIsDevelopment} from "./UseIsDevelopment";
import {Button} from "@mui/material-next";
import {ArtTag, characters} from "./TagUtils";
import {AutocompleteFilterChip} from "./FilterPane";

// TODO Consolidate shared behavior with Uploader.json
// TODO Update this for new JSON structure
export default function AltsUploader(props: {
    imageInformation: ImageInformation,
    altCount: number
}) {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [tags, setTags] = useState<ArtTag[]>([]);
    const [href, setHref] = useState("");
    const [uploading, setUploading] = useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [charactersInImage, setCharactersInImage] = useState<string[]>(["Alcor"])
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
            setSnackbarOpen(true);
        }

        if (selectedFile) {
            setUploading(true);
            const formData = new FormData();
            formData.append("image", selectedFile);
            formData.append("tags", tags.join(", "));
            formData.append("href", href);
            formData.append("imageName", props.imageInformation.title)
            formData.append("altCount", (props.altCount).toString());
            formData.append("characters", charactersInImage.join(", "));
            setUploading(true);
            axios
                .post(`http://localhost:9000/upload/alt`, formData, {
                    headers: {"Content-Type": "multipart/form-data"},
                })
                .catch((reason) => console.log(reason))
                .finally(() => {
                    setUploading(false);
                });
        }
    }

    function handleHrefChange(event: React.ChangeEvent<HTMLInputElement>) {
        setHref(event.target.value);
    }


    return (
        <>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Artwork uploaded!"
            />
            {
                isDevelopment && <div style={{textAlign: "right"}}><Fab
                    color="primary"
                    aria-label="add"
                    onClick={handleClickOpen}
                    variant={"extended"}
                >
                    <AddIcon/> Upload
                </Fab></div>
            }
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload New Image</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a list of tags to automatically compress and upload this file!
                    </DialogContentText>
                    <Button
                        variant={"outlined"}
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
                                      // TODO Make this render as 'add [option]'
                                      const filtered = createFilterOptions<string>()(options, params)
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant={"filled"} disabled={uploading} onClick={handleUpload}>
                        {uploading ? "Uploading..." : "Upload"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
