import {Autocomplete, TextField} from "@mui/material";
import {ArtTag} from "../../api/src/images/TagUtils.ts";
import {AutocompleteFilterChip} from "./gallery/filters/AutocompleteFilterChip.tsx";
import {Button} from "@mui/material-next";
import {updateTags} from "./gallery/GalleryUtils.ts";
import {Bookmark, BookmarkAdd, BookmarkRemove, Cancel} from "@mui/icons-material";
import React from "react";

export function BatchTagging(props: Readonly<{ isTagging: boolean, setIsTagging: (value: React.SetStateAction<boolean>) => void, tags: ArtTag[], setTags: (value: React.SetStateAction<ArtTag[]>) => void, selectedImages: string[] }>) {
    const {setIsTagging, setTags, tags, isTagging, selectedImages} = props;
    if (isTagging) {
        return <div style={{display: 'flex', gap: 8, width: '100%'}}>
            <Autocomplete multiple
                          style={{flex: 1}}
                          renderInput={(params) => <TextField
                              {...params}
                              variant="filled"
                              label="Tags"
                              size={"small"}
                          />}
                          value={tags}
                          onChange={(_event, value) => setTags(value as ArtTag[])}
                          size={"medium"}
                          renderTags={(value, getTagProps) => value.map((option, index) => <AutocompleteFilterChip key={option} option={option} tagProps={getTagProps({index})}/>)}
                          options={Object.values(ArtTag)}/>
            <Button variant={"filled"} color={"primary"} onClick={() => updateTags(tags, selectedImages)}><BookmarkAdd/></Button>
            <Button variant={"filled"} color={"primary"} onClick={() => updateTags(tags, selectedImages, false)}><BookmarkRemove/></Button>
            <Button variant={"filled"} color={"secondary"} onClick={() => setIsTagging(false)}><Cancel/></Button>
        </div>
    } else {
        return <Button startIcon={<Bookmark/>} variant={"filled"} color={"primary"} onClick={() => setIsTagging(true)}>Batch Tag</Button>
    }
}