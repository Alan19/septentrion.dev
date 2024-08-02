import {Autocomplete, FilterOptionsState, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography} from "@mui/material";
import React from "react";
import {ArtTag, tagGroup} from "../ImageInformation";
import Chip from "@mui/material-next/Chip";
import {Filter} from "@mui/icons-material";
import {FormControl, FormLabel} from "@mui/material-next";
import {artists, flattenTags, getNewTagState, isArtist, TagState} from "./UseTagHooks";

function AutocompleteFilterChip(props: { option: string, tagProps: { key: number; className: string; disabled: boolean; "data-tag-index": number; tabIndex: -1; onDelete: (event: any) => void } }) {
    return <Chip
        color={props.option.charAt(0) === "-" ? "error" : "primary"}
        {...props.tagProps}
        size={"small"}
        label={props.option} {...props.tagProps} />;
}

export function FilterPane(props: {
    tagState: TagState,
    setTag: (tags: TagState) => void,
    filterMode: 'and' | 'or',
    setFilterMode: (filterMode: 'and' | 'or') => void,
}) {
    function filterOptions(options: string[], state: FilterOptionsState<string>) {
        if (state.inputValue === '') {
            return options.filter(option => !option.startsWith('-'));
        } else {
            return options.filter(option => option.toLowerCase().startsWith(state.inputValue.toLowerCase()));
        }
    }

    const selectedTags = Object.entries(flattenTags(props.tagState)).filter(value => value[1] !== 0).map(value => value[1] === 1 ? value[0] : `-${value[0]}`);

    function handleFilterChange(value: string[]) {
        let newTagState = getNewTagState();
        value.forEach(tag => {
            const tagName = tag.startsWith("-") ? tag.substring(1) : tag;
            const tagValue = tag.startsWith("-") ? -1 : 1;
            if (isArtist(tagName)) {
                newTagState.artists[tagName] = tagValue
            } else {
                newTagState.tags[tagName as ArtTag] = tagValue
            }
        })
        props.setTag(newTagState)
    }

    /**
     * Get a sorted list of options by flattening the tagGroup object's values, and then inserting tags that aren't classified in the flattened array
     */
    function getSortedOptions() {
        const groupedTags = Object.values(tagGroup).flat().map(value => value.toString());
        const sortedTags = groupedTags.concat(Object.values(ArtTag).map(value => value.toString()).filter(value => !groupedTags.includes(value)));
        return sortedTags.concat(sortedTags.map(value => `-${value.toString()}`));
    }

    /**
     * Returns which group an option belongs to. If it does not belong to a group, then returns "Other" as the group.
     * @param option The name of the option
     */
    function getGroupBy(option: string) {
        const optionName = option.startsWith("-") ? option.substring(1) : option;
        if (isArtist(optionName)) {
            return "Artist";
        } else {
            return Object.entries(tagGroup).find(value => value[1].includes(optionName as ArtTag))?.[0] ?? "Other";
        }
    }

    return <Stack spacing={1}>
        <Typography variant={"h5"}>
            <Filter style={{verticalAlign: "middle", marginRight: 8}}/>Filter Images
        </Typography>
        <FormControl>
            <FormLabel>Filter Mode</FormLabel>
            <RadioGroup value={props.filterMode}>
                <FormControlLabel value={'or'} control={<Radio onChange={(_event) => props.setFilterMode('or')}/>}
                                  label="Or"/>
                <FormControlLabel value={'and'} control={<Radio onChange={(_event) => props.setFilterMode('and')}/>}
                                  label="And"/>
            </RadioGroup>
        </FormControl>
        <Autocomplete multiple
                      limitTags={1}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              variant="filled"
                              label="Filters"
                              placeholder="Tags"
                          />
                      )}
                      groupBy={getGroupBy}
                      value={selectedTags}
                      onChange={(_event, value) => handleFilterChange(value)}
                      filterOptions={(options, state) => filterOptions(options, state)}
                      size={"medium"}
                      renderTags={(value, getTagProps) => value.map((option, index) => <AutocompleteFilterChip option={option} tagProps={getTagProps({index})}/>)}
                      options={getSortedOptions().concat(artists).concat(artists.map(value => '-' + value))}/>
    </Stack>;
}