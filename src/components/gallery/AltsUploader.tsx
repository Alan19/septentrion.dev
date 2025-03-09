import React, {useState} from "react";
import axios from "axios";
import {Autocomplete, Checkbox, createFilterOptions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Radio, RadioGroup, Snackbar, Stack, TextField, Typography,} from "@mui/material";
import {AltType, ImageInformation, isAltTypeComplex} from "../ImageInformation";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddIcon from "@mui/icons-material/Add";
import {useIsDevelopment} from "./UseIsDevelopment";
import {Button, FormLabel} from "@mui/material-next";
import {ArtTag, characters, Rating} from "./TagUtils";
import {AutocompleteFilterChip} from "./FilterPane";

// TODO Consolidate shared behavior with Uploader.json
// TODO Update this for new JSON structure
export default function AltsUploader(props: Readonly<{
    imageInformation: ImageInformation,
    altCount: number
}>) {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [tags, setTags] = useState<ArtTag[]>([]);
    const [href, setHref] = useState("");
    const [uploading, setUploading] = useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [charactersInImage, setCharactersInImage] = useState<string[]>(["Alcor"])
    const [rating, setRating] = useState<Rating | null>();
    const [altType, setAltType] = useState<AltType>("extra")

    const {isDevelopment} = useIsDevelopment();

    const handleClickOpen = () => {
        setOpen(true);
        clearFields();
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


    function clearFields() {
        setSelectedFile(undefined);
        setHref(props.imageInformation.href ?? "");
        setRating(props.imageInformation.rating);
        setTags(props.imageInformation.tags as ArtTag[]);
    }

    function handleUpload(e: any) {
        e.preventDefault();

        function handleSuccessfulUpload() {
            handleClose();
            clearFields();
            setSnackbarOpen(true);
        }

        if (selectedFile && rating) {
            setUploading(true);
            const formData = new FormData();
            formData.append("image", selectedFile);
            formData.append("tags", tags.join(", "));
            formData.append("href", href);
            formData.append("rating", rating)
            formData.append("imageName", props.imageInformation.title)
            formData.append("altCount", (props.altCount).toString());
            formData.append("characters", charactersInImage.join(", "));
            formData.append("altType", isAltTypeComplex(altType) ? JSON.stringify(altType) : altType);
            setUploading(true);
            axios.post(`http://localhost:9000/upload/alt`, formData, {
                headers: {"Content-Type": "multipart/form-data"},
            })
                .then(() => handleSuccessfulUpload())
                .catch((reason) => console.log(reason))
                .finally(() => {
                    setUploading(false);
                });
        }
    }

    function handleHrefChange(event: React.ChangeEvent<HTMLInputElement>) {
        setHref(event.target.value);
    }


    return <>
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message="Artwork uploaded!"
        />
        {
            isDevelopment && <div style={{textAlign: "right"}}><Button
                style={{position: 'fixed', bottom: 16, right: 16}}
                color="primary"
                aria-label="add"
                onClick={handleClickOpen}
                variant="filled"
            >
                <AddIcon/> Upload
            </Button></div>
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
                    Upload File <input
                    type="file"
                    name={"image"}
                    onChange={handleFileChange}
                    hidden
                />
                </Button>
                <Typography style={{marginLeft: "8px"}} component={"span"}>{selectedFile?.name}</Typography>
                <Stack spacing={2}>
                    <Autocomplete
                        multiple
                        fullWidth
                        value={tags}
                        onChange={(event, value) => handleTagsChange(event, value)}
                        id="upload-tag-selector"
                        options={Object.values(ArtTag)}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option}
                        renderOption={(props, option, {selected}) => <li {...props}>
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon fontSize="small"/>}
                                checkedIcon={<CheckBoxIcon fontSize="small"/>}
                                style={{marginRight: 8}}
                                checked={selected}
                            />
                            {option}
                        </li>}
                        renderInput={(params) => <TextField {...params} label="Tag Selection" placeholder="Tags"/>}
                    />
                    <Autocomplete
                        fullWidth
                        value={rating}
                        aria-required
                        onChange={(event, value) => setRating(value)}
                        id="upload-rating-selector"
                        options={Object.values(Rating)}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => <TextField {...params} label="Rating Selection" placeholder="Rating" required={true}/>}
                    />
                    <Autocomplete multiple
                                  renderInput={(params) => <TextField
                                      {...params}
                                      label="Character List"
                                      placeholder="Character"
                                      fullWidth
                                  />}
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
                    <RadioGroup value={typeof altType === 'string' ? altType : "complex"}>
                        <FormLabel>Alt Type</FormLabel>
                        <FormControlLabel value={"extra"} control={<Radio onChange={() => setAltType("extra")}/>} label="Extra"/>
                        <FormControlLabel value={"recolor"} control={<Radio onChange={() => setAltType("recolor")}/>} label="Recolor"/>
                        <FormControlLabel value={"cropped"} control={<Radio onChange={() => setAltType("cropped")}/>} label="Cropped"/>
                        <FormControlLabel value={"complex"} control={<Radio onChange={() => setAltType({pageNumber: 1, altNumber: 1})}/>} label="Complex"/>
                    </RadioGroup>
                    {isAltTypeComplex(altType) && <>
                        <TextField disabled={!isAltTypeComplex(altType)} value={isAltTypeComplex(altType) ? altType.pageNumber : 0} label={"Page Number"} onChange={event => {
                            if (isAltTypeComplex(altType)) {
                                setAltType({...altType, pageNumber: Number.parseInt(event.target.value)});
                            }
                        }}/>
                        <TextField disabled={!isAltTypeComplex(altType)} value={isAltTypeComplex(altType) ? altType.altNumber : 0} label={"Alt Number"} onChange={event => {
                            if (isAltTypeComplex(altType)) {
                                setAltType({...altType, altNumber: Number.parseInt(event.target.value)});
                            }
                        }}/>
                    </>}
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
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant={"filled"} disabled={uploading || !rating || !selectedFile} onClick={handleUpload}>
                    {uploading ? "Uploading..." : "Upload"}
                </Button>
            </DialogActions>
        </Dialog>
    </>;
}
