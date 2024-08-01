// noinspection JSIgnoredPromiseFromCall

import axios from "axios";
import {AltInformation, ArtTag, ImageEntry, ImageInformation, isAltInformation, isImageInformation} from "../ImageInformation";
import {useEffect, useState} from "react";
import images from './images.json'
import {useQueryState} from "react-router-use-location-state";

export type TagState = { artists: Record<string, number>, tags: Record<ArtTag, number> };
export const artists = Array.from(new Set(images.filter(value => value.artist !== undefined && value.artist !== '').map<string>(imageData => imageData.artist as string))).sort((a, b) => a.localeCompare(b));

/**
 * Creates a new instance of a TagState, with all the tags disabled
 */
export function getNewTagState(): TagState {
    return {tags: Object.values(ArtTag).reduce((previousValue, currentValue) => ({...previousValue, [currentValue]: 0}), {}), artists: artists.reduce((previousValue, currentValue) => ({...previousValue, [currentValue]: 0}), {})} as TagState
}

/**
 * Flattens the tags in a TagState, making them all be on the same level with the tag or artist name as the key, and the status of the tag as the value
 * @param tagState
 */
export function flattenTags(tagState: TagState): { [tagOrArtist in string]: number } {
    return {...tagState.tags, ...tagState.artists};
}

/**
 * Checks if a tag is an artist
 * @param optionName The name of the tag (with the '-' in the front removed if there is one)
 */
export function isArtist(optionName: string) {
    return artists.includes(optionName);
}

export function useTagHooks() {
    const [tagURLParam, setTagURLParams] = useQueryState('filters', JSON.stringify({}));
    const [imageData, setImageData] = useState<(ImageInformation)[]>([]);
    const [altData, setAltData] = useState<Map<string, AltInformation[]>>(new Map());

    /**
     * Deserializes the tag state from the URL params, basically converts the url a tagstate, with anything that isn't defined in the URL being set to 0
     */
    function getTags(): TagState {
        const tagState = getNewTagState();
        let parsedURLState = JSON.parse(tagURLParam);
        Object.keys(tagState.tags).forEach(value => {
            tagState.tags[value as ArtTag] = Number(parsedURLState[value]) || 0;
        })
        Object.keys(tagState.artists).forEach(value => {
            tagState.artists[value] = Number(parsedURLState[value]) || 0;
        })
        return tagState;
    }

    /**
     * Serializes the changes to the state of tags in the format of {name: -1, 1}. Ignores unselected tags.
     * @param tags The new tag state
     */
    function setTags(tags: TagState) {
        const allTags = Object.values(ArtTag).map(value => value.toString()).concat(artists);
        const flattenedTags = flattenTags(tags);
        let serializedTags = allTags.filter(value => flattenedTags[value] !== undefined && flattenedTags[value] !== 0)
            .reduce((previousValue, currentValue) => ({
                ...previousValue,
                [currentValue]: String(flattenedTags[currentValue])
            }), {});
        setTagURLParams(JSON.stringify(serializedTags));
    }

    useEffect(() => {
        loadImageInfo()
    }, [tagURLParam]);

    async function loadImageInfo() {
        const tags = getTags();
        if (process.env.NODE_ENV === "development") {
            await axios.get<ImageEntry[]>('http://localhost:9000/images/', {params: tags})
                .then(value => {
                    setImageData(value.data.filter(isImageInformation));
                    // Filter images for alts, then collect them into a map with their keys being the parent name, and the value being all the alts
                    setAltData(value.data.filter(isAltInformation).reduce((map, alt) => map.set(alt.parent, [...(map.get(alt.parent) ?? []), alt]), new Map()));
                });
        } else {
            const jsonImages: ImageEntry[] = images.map<ImageEntry>(value => ({...value, rating: 'general'}));
            setAltData(jsonImages.filter(isAltInformation).reduce((map, alt) => map.set(alt.parent, [...(map.get(alt.parent) ?? []), alt]), new Map()));
            setImageData(jsonImages.filter(isImageInformation));
        }
    }

    return {getTags, setTags, images: imageData, loadImageInfo, altData};
}
