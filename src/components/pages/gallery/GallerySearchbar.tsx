import {BeerCssCombobox} from "../../ui/BeerCssCombobox.tsx";
import {artists, ArtTag, characters, Rating} from "../../../../api/src/images/TagUtils.ts";
import React from "react";
import {useTagHooks} from "../../../hooks/useTagHooks.ts";
import type {Option} from "react-multi-select-component";

export function GallerySearchbar() {
    const {filters, setFilters} = useTagHooks()
    /**
     * Get a sorted list of options by flattening the tagGroup object's values, and then inserting tags that aren't classified in the flattened array
     */
    function getSortedOptions() {
        const groupedTags = Object.values(ArtTag).flat().map(value => value.toString());
        const sortedTags = groupedTags.concat(Object.values(ArtTag).map(value => value.toString()).filter(value => !groupedTags.includes(value)));
        return sortedTags.concat(sortedTags.map(value => `-${value.toString()}`));
    }

    function handleFilterChange(value: Option[]) {
        setFilters(value.map(value1 => value1.value).join('+'))
    }


    return <BeerCssCombobox placeholder={"Tags"}
                            value={filters.toArray().map(value => ({value: value, label: value}))}
                            filterOptions={(options, query) => query.startsWith("-") ? options.filter(value => value.label.startsWith("-")) : options.filter(value => !value.label.startsWith("-"))}
                            options={[...getSortedOptions(),
                                ...artists.flatMap(value => [value, `-${value}`]),
                                ...characters.flatMap(value => [value, `-${value}`]),
                                ...Object.values(Rating).flatMap(value => [value, `-${value}`])].map(value => ({label: value, value: value}))}
                            onChange={selectedOption => handleFilterChange(selectedOption)}/>;
}