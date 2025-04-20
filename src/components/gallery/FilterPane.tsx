import {Autocomplete, FilterOptionsState, FormControlLabel, FormGroup, Radio, RadioGroup, Stack, TextField, Typography} from "@mui/material";
import {Filter} from "@mui/icons-material";
import {FormControl, FormLabel} from "@mui/material-next";
import {artists, ArtTag, characters, Rating, SelectedFilters, tagGroup} from "../../../api/src/images/TagUtils.ts";
import _ from "lodash";
import Switch from "@mui/material-next/Switch";
import {AltSettings} from "./useAltDisplaySettings";
import {FilterMode} from "./GalleryUtils.ts";
import {AutocompleteFilterChip} from "./filters/AutocompleteFilterChip.tsx";

interface FilterPaneProps {
    filters: SelectedFilters;
    setFilters: (tags: string) => void;
    filterMode: FilterMode;
    setFilterMode: (filterMode: FilterMode) => void;
    altDisplaySettings: AltSettings;
}

export function FilterPane(props: Readonly<FilterPaneProps>) {
    function filterOptions(options: string[], state: FilterOptionsState<string>) {
        if (state.inputValue === '') {
            return options.filter(option => !option.startsWith('-'));
        } else {
            return options.filter(option => option.toLowerCase().startsWith(state.inputValue.toLowerCase()));
        }
    }

    function handleFilterChange(value: string[]) {
        props.setFilters(value.join('+'))
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
        const filterType = SelectedFilters.getFilterType(optionName);
        if (filterType === 'Tag') {
            return Object.entries(tagGroup).find(value => value[1].includes(optionName as ArtTag))?.[0] ?? "Other"
        } else {
            return _.capitalize(filterType);
        }
    }

    return <Stack spacing={1}>
        <Typography variant={"h5"}>
            <Filter style={{verticalAlign: "middle", marginRight: 8}}/>Filter Images
        </Typography>
        <FormControl>
            <FormLabel>Filter Mode</FormLabel>
            <RadioGroup value={props.filterMode}>
                <FormControlLabel value={'or'} control={<Radio onChange={() => props.setFilterMode(FilterMode.or)}/>}
                                  label="Or"/>
                <FormControlLabel value={'and'} control={<Radio onChange={() => props.setFilterMode(FilterMode.and)}/>}
                                  label="And"/>
            </RadioGroup>
        </FormControl>
        <FormGroup>
            <FormLabel>Alt Display Settings</FormLabel>
            <FormControlLabel control={<Switch checked={props.altDisplaySettings.displayAlts} onClick={() => props.altDisplaySettings.setDisplayAlts(!props.altDisplaySettings.displayAlts)}/>} label="Alts"/>
            <FormControlLabel control={<Switch checked={props.altDisplaySettings.displaySequences} onClick={() => props.altDisplaySettings.setDisplaySequences(!props.altDisplaySettings.displaySequences)}/>} label="Sequences"/>
            <FormControlLabel control={<Switch checked={props.altDisplaySettings.displayExtras} onClick={() => props.altDisplaySettings.setDisplayExtras(!props.altDisplaySettings.displayExtras)}/>} label="Extras"/>
            <FormControlLabel control={<Switch checked={props.altDisplaySettings.displayCrops} onClick={() => props.altDisplaySettings.setDisplayCrops(!props.altDisplaySettings.displayCrops)}/>} label="Cropped Versions"/>
            <FormControlLabel control={<Switch checked={props.altDisplaySettings.displayRecolors} onClick={() => props.altDisplaySettings.setDisplayRecolors(!props.altDisplaySettings.displayRecolors)}/>} label="Recolors"/>
        </FormGroup>
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
                      value={props.filters.toArray()}
                      onChange={(_event, value) => handleFilterChange(value)}
                      filterOptions={(options, state) => filterOptions(options, state)}
                      size={"medium"}
                      renderTags={(value, getTagProps) => value.map((option, index) => <AutocompleteFilterChip option={option} key={option} tagProps={getTagProps({index})}/>)}
                      options={getSortedOptions().concat(artists.flatMap(value => [value, '-' + value])).concat(characters.flatMap(value => [value, '-' + value])).concat(Object.values(Rating).flatMap(value => [value, '-' + value]))}/>
    </Stack>;
}