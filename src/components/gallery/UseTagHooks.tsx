// noinspection JSIgnoredPromiseFromCall

import axios from "axios";
import {useSearchParams} from "react-router-dom";
import {AltInformation, ArtTag, ImageInformation, isAltInformation, isImageInformation} from "../ImageInformation";
import {TagState} from "./Gallery";
import {useEffect, useState} from "react";
import images from './images.json'

export function useTagHooks() {
    const [tagURLParam, setTagURLParams] = useSearchParams();
    const [imageData, setImageData] = useState<(ImageInformation)[]>([]);
    const [altData, setAltData] = useState<Map<string, AltInformation[]>>(new Map());

    /**
     * Deserializes the tag state from the URL params, basically converts the url a tagstate, with anything that isn't defined in the URL being set to 0
     */
    function getTags(): TagState {
        return Object.values(ArtTag).reduce((previousValue, currentValue) => {
            return {
                ...previousValue,
                [currentValue]: Number(tagURLParam.get(currentValue))
            }
        }, {}) as TagState;
    }

    /**
     * Serializes the changes to the state of tags in the format of {name: -1, 1}. Ignores unselected tags.
     * @param tags The new tag state
     */
    function setTags(tags: TagState) {
        setTagURLParams(Object.values(ArtTag)
            .filter(value => tags[value] !== 0)
            .reduce((previousValue, currentValue) => ({
                ...previousValue,
                [currentValue]: String(tags[currentValue])
            }), {}));
    }

    useEffect(() => {
        loadImageInfo()
    }, [tagURLParam]);

    async function loadImageInfo() {
        const tags = getTags();
        if (process.env.NODE_ENV === "development") {
            await axios.get<(ImageInformation | AltInformation)[]>('http://localhost:9000/images/', {params: tags})
                .then(value => {
                    setImageData(value.data.filter(isImageInformation));
                    setAltData(value.data.filter(isAltInformation).reduce((map, alt) => map.set(alt.parent, [...(map.get(alt.parent) ?? []), alt]), new Map()));
                });
        } else {
            const jsonImages: (AltInformation | ImageInformation)[] = images;
            setAltData(jsonImages.filter(isAltInformation).reduce((map, alt) => map.set(alt.parent, [...(map.get(alt.parent) ?? []), alt]), new Map()));
            setImageData(jsonImages.filter(isImageInformation));
        }
    }

    return {getTags, setTags, images: imageData, loadImageInfo, altData};
}